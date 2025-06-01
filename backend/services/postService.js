const Post = require("../models/postModel");

const createPostService = async (userId, title, description) => {
  const post = await Post.create({ userId, title, description });
  return post;
};

const getAllPostsService = async (userId) => {
  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  return posts;
};

const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId);
  return post;
};

const updatePostService = async (postId, userId, updateData) => {
  const post = await Post.findOneAndUpdate(
    { _id: postId, userId: userId }, 
    { $set: updateData },            
    { new: true, runValidators: true } 
  );
  return post;
};

const deletePostService = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ _id: postId, userId: userId });
  return post;
};

module.exports = { createPostService, getAllPostsService, getPostByIdService, updatePostService, deletePostService }