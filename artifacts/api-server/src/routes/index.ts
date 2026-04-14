import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import portfolioRouter from "./portfolio";
import ceoRouter from "./ceo";
import backgroundsRouter from "./backgrounds";
import contentRouter from "./content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(portfolioRouter);
router.use(ceoRouter);
router.use(backgroundsRouter);
router.use(contentRouter);

export default router;
