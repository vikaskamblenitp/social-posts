import { Request, Response } from "express";
import { posts } from "./posts.js";
import { catchAsync } from "#utils/index.js";

export const controller = {
  addPost: catchAsync(async (req: Request, res: Response) => {
    const response = await posts.addPost(req.body, req.file);
    return res.status(200).json(response);
  }),

  getPosts: catchAsync(async (req: Request, res: Response) => {
    const response = await posts.getPosts();
    res.status(200).send(response);
  })
}