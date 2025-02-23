import { Request, Response } from "express";
import { posts } from "./posts.js";
import { catchAsync } from "#utils/index.js";
import { TGetPostsQuery } from "./schema.js";

export const controller = {
  addPost: catchAsync(async (req: Request, res: Response) => {
    const response = await posts.addPost(req.body, req.file);
    res.jsend.success(response);
  }),

  getPosts: catchAsync(async (req: Request, res: Response) => {
    const response = await posts.getPosts(req.query as unknown as TGetPostsQuery)
    res.jsend.success(response);
  })
}