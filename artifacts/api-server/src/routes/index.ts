import { Router } from "express";
import healthRouter from "./health.js";
import adminRouter from "./admin.js";
import portfolioRouter from "./portfolio.js";
import ceoRouter from "./ceo.js";
import backgroundsRouter from "./backgrounds.js";
import contentRouter from "./content.js";

const router = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(portfolioRouter);
router.use(ceoRouter);
router.use(backgroundsRouter);
router.use(contentRouter);

export default router;
