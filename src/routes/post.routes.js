const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/posts", authMiddleware, postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", authMiddleware, postController.updatePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

module.exports = router;
