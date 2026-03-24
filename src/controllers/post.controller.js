const postService = require("../services/post.service");

function createPost(req, res) {
  const result = postService.createPost(req.body, req.user);
  return res.status(result.status).json(result.data);
}

function getAllPosts(req, res) {
  const result = postService.getAllPosts();
  return res.status(result.status).json(result.data);
}

function getPostById(req, res) {
  const postId = parseInt(req.params.id, 10);
  const result = postService.getPostById(postId);
  return res.status(result.status).json(result.data);
}

function updatePost(req, res) {
  const postId = parseInt(req.params.id, 10);
  const result = postService.updatePost(postId, req.body, req.user);
  return res.status(result.status).json(result.data);
}

function deletePost(req, res) {
  const postId = parseInt(req.params.id, 10);
  const result = postService.deletePost(postId, req.user);
  return res.status(result.status).json(result.data);
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
