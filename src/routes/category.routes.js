const express = require("express");
const router = express.router();
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  categoryController.createCategory,
);

router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);

router.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.updateCategory,
);

router.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.deleteCategory,
);

module.exports = router;
