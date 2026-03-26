const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/comments", authMiddleware, commentController.createComment);
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getCommentById);
router.get("/posts/:postId/comments", commentController.getCommentsByPostId);
router.put("/comments/:id", authMiddleware, commentController.updateComment);
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
