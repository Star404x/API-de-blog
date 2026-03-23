const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/me", authMiddleware, userController.me);
router.get("/profile", authMiddleware, userController.profile);

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  userController.adminAccess,
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  userController.getAllUsers,
);
router.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userController.getUserById,
);
router.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userController.updateUser,
);
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser,
);

module.exports = router;
