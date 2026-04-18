const categoryService = require("../services/category.service");

function createCategory(req, res) {
  const result = categoryService.createCategory(req.body);
  return res.status(result.status).json(result.data);
}

function getAllCategories(req, res) {
  const result = categoryService.getAllCategories();
  return res.status(result.status).json(result.data);
}

function getCategoryById(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  const result = categoryService.getCategoryById(categoryId);
  return res.status(result.status).json(result.data);
}

function updateCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  const result = categoryService.updateCategory(categoryId, req.body);
  return res.status(result.status).json(result.data);
}

function deleteCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  const result = categoryService.deleteCategory(categoryId);
  return res.status(result.status).json(result.data);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
