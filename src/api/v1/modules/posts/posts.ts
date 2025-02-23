import { PostsModel, TagModel } from "./model";
import { TAddPostRequestBody } from "./schema";
import { extractTags } from "#utils";

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
        await TagModel.updateMany({ tag: tag }, { $push: {posts: post._id }}, { "new": true, "upsert": true });
      }));
    }

    return { data: { _id: post.id }, message: "post added successfully" };
  }

  async getPosts() {
    const posts = await PostsModel.find({});
    return posts;
  }
}

export const posts = new Posts();