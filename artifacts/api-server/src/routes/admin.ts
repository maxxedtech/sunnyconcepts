import { Router } from "express";
import { AdminLoginBody, AdminMeResponse } from "@workspace/api-zod";

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sunnyadmin2024";

router.post("/admin/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
  (req as any).session.isAdmin = true;
  res.json({ success: true, message: "Logged in successfully" });
});

router.post("/admin/logout", (req, res) => {
  (req as any).session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

router.get("/admin/me", (req, res) => {
  const isAdmin = !!(req as any).session?.isAdmin;
  res.json({ authenticated: isAdmin });
});

export default router;
