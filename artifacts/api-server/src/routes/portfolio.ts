import { Router, type Request, type Response } from "express";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";
import { supabase } from "../lib/supabase.js";

const router = Router();

// Use memory storage (required for Vercel)
const upload = multer({ storage: multer.memoryStorage() });

// Helper: upload buffer to Cloudinary
const streamUpload = (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

// GET portfolio
router.get("/portfolio", async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error });

  return res.json(data);
});

// POST portfolio
router.post(
  "/portfolio",
  upload.single("file"),
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Cloudinary
      const result = await streamUpload(req.file.buffer);

      // Save to Supabase
      const { data, error } = await supabase
        .from("portfolio")
        .insert([
          {
            title,
            description,
            image_url: result.secure_url,
          },
        ])
        .select();

      if (error) return res.status(500).json({ error });

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
