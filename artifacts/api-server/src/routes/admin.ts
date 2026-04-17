import { Router, type Request, type Response } from "express";

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sunnyadmin2024";

// ✅ Login
router.post("/admin/login", async (req: Request, res: Response) => {
  const { password } = req.body || {};

  if (!password) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }

  (req as any).session.isAdmin = true;

  return res.json({ success: true, message: "Logged in successfully" });
});

// ✅ Logout
router.post("/admin/logout", (req: Request, res: Response) => {
  (req as any).session.destroy(() => {
    return res.json({ success: true, message: "Logged out" });
  });
});

// ✅ Check session
router.get("/admin/me", (req: Request, res: Response) => {
  const isAdmin = !!(req as any).session?.isAdmin;

  return res.json({ authenticated: isAdmin });
});

export default router;
