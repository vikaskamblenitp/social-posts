import { Router } from "express";
import postsroutes from "./posts/routes.js";

const router = Router();

router.use(postsroutes);

export default router;
