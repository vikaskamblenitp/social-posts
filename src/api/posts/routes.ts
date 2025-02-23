import { Router } from "express";
import { controller as api } from "./controller.js";

const router = Router();

router.post("/posts", api.addPost);

export default router;