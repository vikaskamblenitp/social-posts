import { Router } from "express";
import moduleRoutes from "./modules";

const router = Router();

router.use(moduleRoutes);

export default router;