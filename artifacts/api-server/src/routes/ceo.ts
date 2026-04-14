import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import { ceoProfileTable } from "@workspace/db";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `ceo-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get("/ceo", async (_req, res) => {
  const profiles = await db.select().from(ceoProfileTable).limit(1);
  if (profiles.length === 0) {
    const [created] = await db.insert(ceoProfileTable).values({ name: "" }).returning();
    return res.json(created);
  }
  res.json(profiles[0]);
});

router.put("/ceo", upload.single("file"), async (req, res) => {
  const { name, bio, vision } = req.body;
  
  const profiles = await db.select().from(ceoProfileTable).limit(1);
  let imageUrl: string | undefined;

  if (req.file) {
    imageUrl = `/api/uploads/${req.file.filename}`;
  }

  const updateData: Record<string, any> = {};
  if (name !== undefined) updateData.name = name;
  if (bio !== undefined) updateData.bio = bio;
  if (vision !== undefined) updateData.vision = vision;
  if (imageUrl) updateData.imageUrl = imageUrl;

  if (profiles.length === 0) {
    const [created] = await db.insert(ceoProfileTable).values({
      name: name || "",
      bio: bio || null,
      vision: vision || null,
      imageUrl: imageUrl || null,
    }).returning();
    return res.json(created);
  }

  const { eq } = await import("drizzle-orm");
  const [updated] = await db
    .update(ceoProfileTable)
    .set(updateData)
    .where(eq(ceoProfileTable.id, profiles[0].id))
    .returning();

  res.json(updated);
});

export default router;
