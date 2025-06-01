const { createPostService, getAllPostsService, getPostByIdService, updatePostService, deletePostService } = require("../services/postService");
const CustomError = require("../utils/customError");

const createPost = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new CustomError("Title and description are required", 400);
  }
  const data = await createPostService(userId, title, description);
  res
    .status(201)
    .json({ status: "success", message: "post created successfully", data });
};

const getAllPosts = async (req, res) => {
  const userId = req.user.id;

  const data = await getAllPostsService(userId);
  res
    .status(200)
    .json({ status: "success", message: "post retrived successfully", data });
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  const data = await getPostByIdService(postId);
  if (!data) {
    throw new CustomError("Post not found", 404);
  }
  res
    .status(200)
    .json({ status: "success", message: "post retrived successfully", data });
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { title, description } = req.body;

  if (!title && !description) {
    throw new CustomError(
      "At least one field (title or description) is required for update.",
      400
    );
  }

  const data = await updatePostService(postId, userId, { title, description });

  if (!data) {
    throw new CustomError(
      "Post not found or you are not authorized to update this post",
      404
    );
  }

  res
    .status(200)
    .json({ status: "success", message: "Post updated successfully", data });
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id; 

    const data = await deletePostService(postId, userId);

    if (!data) {
      throw new CustomError("Post not found or you are not authorized to delete this post", 404);
    }

    res
      .status(200)
      .json({ status: "success", message: "Post deleted successfully" });
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };