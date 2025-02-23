import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var imageSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
    contentType: String,
});

const postSchema = new Schema({
  title: String,
  desc: String,
  image: imageSchema,
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

const tagSchema = new Schema({
  tag: { type: String, index: true },
  posts: [ObjectId]
});

export const PostsModel = mongoose.model('Posts', postSchema);
export const TagModel = mongoose.model('Tags', tagSchema);
