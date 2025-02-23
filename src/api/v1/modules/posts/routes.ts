import { Router } from "express";
import { controller as api } from "./controller.js";
import { externalUploadMiddleware, methodNotAllowed, validateTypedSchema } from "#middlewares";
import { schema } from "./schema.js";

const router = Router();

router.route("/posts")
.post(externalUploadMiddleware("file"), validateTypedSchema(schema.addPosts), api.addPost)
    .get(validateTypedSchema(schema.getPosts), api.getPosts)
    .all(methodNotAllowed);

export default router;