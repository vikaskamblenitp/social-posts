import { PostsModel, TagModel } from "./model";
import { TAddPostRequestBody, TGetPostsQuery } from "./schema";
import { extractTags } from "#utils";
import { Express } from "express";

class Posts {
  async addPost(body: TAddPostRequestBody, image?: Express.Multer.File) {
    const post = await PostsModel.create({
      title: body.title,
      desc: body.desc,
      ...(image && { image: {
        filename: image.filename,
        data: image.buffer,
        contentType: image.mimetype
      }})
    });

    const tags = extractTags(body.desc as string);
    if (tags.length) {
      await Promise.allSettled(tags.map(async tag => {
        await TagModel.updateMany({ tag }, { $push: {posts: post._id }}, { "new": true, "upsert": true });
      }));
    }

    return { data: { _id: post.id }, message: "post added successfully" };
  }

  async getPosts(query: TGetPostsQuery) {
    const { page = 1, limit = 10, filter, sort = { created_at: "asc" } } = query;
    const skip = (page - 1) * limit;

    const matchStage: Record<string, any> = {};

    if (filter?.keyword) {
      matchStage.$text = { $search: filter.keyword };
    }

    if (filter?.tag) {
      const tag = await TagModel.findOne({ tag: filter.tag }).select("posts").lean();

      // No matching posts
      if (!tag || !tag.posts.length) {
        return { page, limit, totalPages: 0, totalDocuments: 0, posts: [] };
      }

      // Filter posts by matching postIds
      matchStage._id = { $in: tag.posts };
    }

    const posts = await PostsModel.find(matchStage)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalDocuments = await PostsModel.countDocuments(matchStage);
    const totalPages = Math.ceil(totalDocuments / limit);
  
    return {
      page,
      limit,
      totalPages,
      totalDocuments,
      posts,
    };
  }
}

export const posts = new Posts();