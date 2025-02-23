import { PostsModel, TagModel } from "./model";
import { TAddPostRequestBody, TGetPostsQuery } from "./schema";
import { extractTags } from "#utils";
import { Express } from "express";

class Posts {
  /**
   * @description function to add posts and link tags
   * @param body body of the request
   * @param {string} body.title: title of the post
   * @param {string} body.description: description of the post 
   * @param {File} [image]: image file
   * @returns 
   */
  async addPost(body: TAddPostRequestBody, image?: Express.Multer.File) {
    // add post
    const post = await PostsModel.create({
      title: body.title,
      desc: body.desc,
      ...(image && { image: {
        filename: image.filename,
        data: image.buffer,
        contentType: image.mimetype
      }})
    });

    // extract all tags present in description
    // Assumption: No tag in title
    const tags = extractTags(body.desc as string);

    // if tags are present then link the post with all of the tags
    if (tags.length) {
      await Promise.allSettled(tags.map(async tag => {
        await TagModel.updateMany({ tag }, { $push: {posts: post._id }}, { "new": true, "upsert": true });
      }));
    }

    return { data: { _id: post.id }, message: "post added successfully" };
  }

  /**
   * @description function to return paginated posts
   * @param query
   * @param {number} [query.page]: page number defaults to 1
   * @param {number} [query.limit]: page limit defaults to 10
   * @param {object} [query.filter]: filter params
   * @param {string} [query.filter.keyword]: filter posts by keyword // TODO: search suits well
   * @param {string} [query.filter.tag]: filter posts by tag
   * @param {object} [query.sort]
   * @param {string} [query.sort.created_at]: "asc" | "desc"
   * @returns list of posts along with other stats
   */
  async getPosts(query: TGetPostsQuery) {
    const { page = 1, limit = 10, filter, sort = { created_at: "asc" } } = query;
    const skip = (page - 1) * limit;

    const matchStage: Record<string, any> = {};

    // search by title & description. both have a text search index
    if (filter?.keyword) {
      matchStage.$text = { $search: filter.keyword };
    }

    // filter posts by tag
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

    // get total documents using above filters 
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