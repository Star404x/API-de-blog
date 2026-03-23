const userService = require("../services/user.service");

function me(req, res) {
  const result = userService.getMe(req.user.userId);
  return res.status(result.status).json(result.data);
}

function profile(req, res) {
  const result = userService.getProfile(req.user);
  return res.status(result.status).json(result.data);
}

function getAllUsers(req, res) {
  const result = userService.getAllUsers();
  return res.status(result.status).json(result.data);
}

function getUserById(req, res) {
  const userId = parseInt(req.params.id, 10);
  const result = userService.getUserById(userId);
  return res.status(result.status).json(result.data);
}

function updateUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  const result = userService.updateUser(userId, req.body);
  return res.status(result.status).json(result.data);
}

function deleteUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  const result = userService.deleteUser(userId);
  return res.status(result.status).json(result.data);
}

function adminAccess(req, res) {
  return res.status(200).json({
    message: "Bienvenue admin",
    user: req.user,
  });
}

module.exports = {
  me,
  profile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  adminAccess,
};
