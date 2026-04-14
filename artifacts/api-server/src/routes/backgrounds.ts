import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import { backgroundImagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { DeleteBackgroundParams } from "@workspace/api-zod";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `bg-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get("/backgrounds", async (_req, res) => {
  const backgrounds = await db
    .select()
    .from(backgroundImagesTable)
    .orderBy(backgroundImagesTable.sortOrder);
  res.json(backgrounds);
});

router.post("/backgrounds", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { label, animationSpeed } = req.body;
  const imageUrl = `/api/uploads/${req.file.filename}`;

  const [bg] = await db.insert(backgroundImagesTable).values({
    imageUrl,
    label: label || null,
    isActive: true,
    animationSpeed: animationSpeed ? parseFloat(animationSpeed) : 5,
    sortOrder: 0,
  }).returning();

  res.status(201).json(bg);
});

router.delete("/backgrounds/:id", async (req, res) => {
  const parsed = DeleteBackgroundParams.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: "Invalid ID" });

  const [deleted] = await db
    .delete(backgroundImagesTable)
    .where(eq(backgroundImagesTable.id, parsed.data.id))
    .returning();

  if (deleted?.imageUrl) {
    const filename = path.basename(deleted.imageUrl);
    const filepath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }

  res.status(204).send();
});

export default router;
