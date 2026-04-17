import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import { portfolioImagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

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

// ✅ GET
router.get("/portfolio", async (req: Request, res: Response) => {
  try {
    const category = req.query?.category as string | undefined;

    const images = await db
      .select()
      .from(portfolioImagesTable)
      .where(category ? eq(portfolioImagesTable.category, category) : undefined)
      .orderBy(portfolioImagesTable.sortOrder, portfolioImagesTable.createdAt);

    return res.json(
      images.map((img) => ({
        ...img,
        createdAt: img.createdAt.toISOString(),
      }))
    );
  } catch {
    return res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

// ✅ POST
router.post(
  "/portfolio",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { category, title, description } = req.body;

      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }

      const imageUrl = `/api/uploads/${req.file.filename}`;

      const [image] = await db
        .insert(portfolioImagesTable)
        .values({
          category,
          title: title || null,
          description: description || null,
          imageUrl,
          sortOrder: 0,
        })
        .returning();

      return res
        .status(201)
        .json({ ...image, createdAt: image.createdAt.toISOString() });
    } catch {
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

// ✅ PUT
router.put("/portfolio/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const [updated] = await db
      .update(portfolioImagesTable)
      .set(req.body)
      .where(eq(portfolioImagesTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.json({
      ...updated,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch {
    return res.status(500).json({ error: "Failed to update image" });
  }
});

// ✅ DELETE
router.delete("/portfolio/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const [deleted] = await db
      .delete(portfolioImagesTable)
      .where(eq(portfolioImagesTable.id, id))
      .returning();

    if (deleted?.imageUrl) {
      const filename = path.basename(deleted.imageUrl);
      const filepath = path.join(UPLOADS_DIR, filename);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
