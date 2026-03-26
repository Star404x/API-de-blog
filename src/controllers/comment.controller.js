const commentService = require("../services/comment.service");

function createComment(req, res) {
  const result = commentService.createComment(req.body, req.user);
  return res.status(result.status).json(result.data);
}

function getAllComments(req, res) {
  const result = commentService.getAllComments();
  return res.status(result.status).json(result.data);
}

function getCommentById(req, res) {
  const commentId = parseInt(req.params.id, 10);
  const result = commentService.getCommentById(commentId);
  return res.status(result.status).json(result.data);
}

function getCommentsByPostId(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const result = commentService.getCommentsByPostId(postId);
  return res.status(result.status).json(result.data);
}

function updateComment(req, res) {
  const commentId = parseInt(req.params.id, 10);
  const result = commentService.updateComment(commentId, req.body, req.user);
  return res.status(result.status).json(result.data);
}

function deleteComment(req, res) {
  const commentId = parseInt(req.params.id, 10);
  const result = commentService.deleteComment(commentId, req.user);
  return res.status(result.status).json(result.data);
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
