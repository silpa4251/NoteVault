const express = require("express");
const asyncErrorHandler = require("../middlewres/asyncErrorHandler");
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");
const auth = require("../middlewres/auth");
const postRouter = express.Router();

postRouter.post("/", auth, asyncErrorHandler(createPost));
postRouter.get("/", auth, asyncErrorHandler(getAllPosts));
postRouter.get("/:id", auth, asyncErrorHandler(getPostById));
postRouter.put("/:id", auth, asyncErrorHandler(updatePost));
postRouter.delete("/:id", auth, asyncErrorHandler(deletePost));

module.exports = postRouter;