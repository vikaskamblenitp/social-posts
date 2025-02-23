import { Router } from "express";
import sseRouter from "./posts/routes.js";

const router = Router();

router.use(sseRouter);

export default router;