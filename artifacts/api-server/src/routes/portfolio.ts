import { Router, type Request, type Response } from "express";
import multer from "multer";
import cloudinary from "../lib/cloudinary";
import { supabase } from "../lib/supabase";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET all portfolio items
router.get("/portfolio", async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error });

  return res.json(data);
});

// POST new portfolio item
router.post(
  "/portfolio",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        async (error, result) => {
          if (error || !result) {
            return res.status(500).json({ error: "Upload failed" });
          }

          // Save to Supabase
          const { data, error: dbError } = await supabase
            .from("portfolio")
            .insert([
              {
                title,
                description,
                image_url: result.secure_url,
              },
            ])
            .select();

          if (dbError) return res.status(500).json({ error: dbError });

          return res.status(201).json(data);
        }
      );

      uploadResult.end(req.file.buffer);
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
