import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import { portfolioImagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListPortfolioImagesQueryParams, UpdatePortfolioImageBody, UpdatePortfolioImageParams, DeletePortfolioImageParams } from "@workspace/api-zod";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get("/portfolio", async (req, res) => {
  const parsed = ListPortfolioImagesQueryParams.safeParse(req.query);
  const category = parsed.success ? parsed.data.category : undefined;
  
  const images = await db
    .select()
    .from(portfolioImagesTable)
    .where(category ? eq(portfolioImagesTable.category, category) : undefined)
    .orderBy(portfolioImagesTable.sortOrder, portfolioImagesTable.createdAt);

  res.json(images.map(img => ({
    ...img,
    createdAt: img.createdAt.toISOString(),
  })));
});

router.post("/portfolio", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { category, title, description } = req.body;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const imageUrl = `/api/uploads/${req.file.filename}`;
  const [image] = await db.insert(portfolioImagesTable).values({
    category,
    title: title || null,
    description: description || null,
    imageUrl,
    sortOrder: 0,
  }).returning();

  res.status(201).json({ ...image, createdAt: image.createdAt.toISOString() });
});

router.put("/portfolio/:id", async (req, res) => {
  const paramsParsed = UpdatePortfolioImageParams.safeParse(req.params);
  if (!paramsParsed.success) return res.status(400).json({ error: "Invalid ID" });

  const bodyParsed = UpdatePortfolioImageBody.safeParse(req.body);
  if (!bodyParsed.success) return res.status(400).json({ error: "Invalid body" });

  const [updated] = await db
    .update(portfolioImagesTable)
    .set(bodyParsed.data)
    .where(eq(portfolioImagesTable.id, paramsParsed.data.id))
    .returning();

  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

router.delete("/portfolio/:id", async (req, res) => {
  const parsed = DeletePortfolioImageParams.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: "Invalid ID" });

  const [deleted] = await db
    .delete(portfolioImagesTable)
    .where(eq(portfolioImagesTable.id, parsed.data.id))
    .returning();

  if (deleted?.imageUrl) {
    const filename = path.basename(deleted.imageUrl);
    const filepath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }

  res.status(204).send();
});

export default router;
