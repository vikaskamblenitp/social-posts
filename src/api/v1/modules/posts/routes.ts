import { Router } from "express";
import { controller as api } from "./controller.js";
import { externalUploadMiddleware, validateTypedSchema } from "#middlewares";
import { schema } from "./schema.js";

const router = Router();

router.route("/posts").get(api.getPosts).post(externalUploadMiddleware("file"), validateTypedSchema(schema.addPosts), api.addPost);

export default router;