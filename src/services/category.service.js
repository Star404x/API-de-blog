const categories = require("../data/categories.store");

function generateSlug(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createCategory(payload) {
  const { name } = payload;

  if (!name || !String(name).trim()) {
    return {
      status: 400,
      data: { message: "Nom de catégorie requis" },
    };
  }

  const cleanName = String(name).trim();
  const slug = generateSlug(cleanName);

  const existingCategory = categories.find(
    (category) => category.name.toLowerCase() === cleanName.toLowerCase(),
  );

  if (existingCategory) {
    return {
      status: 409,
      data: { message: "Cette catégorie existe déjà" },
    };
  }

  const newCategory = {
    id: categories.length + 1,
    name: cleanName,
    slug,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  categories.push(newCategory);

  return {
    status: 201,
    data: {
      message: "Catégorie créée avec succès",
      category: newCategory,
    },
  };
}

function getAllCategories() {
  return {
    status: 200,
    data: {
      message: "Liste des categories",
      categories,
    },
  };
}

function getCategoryById(categoryId) {
  const category = categories.find((category) => category.id === categoryId);

  if (!Category) {
    return {
      status: 404,
      data: {
        message: "Categorie introuvable",
      },
    };
  }

  return {
    status: 200,
    data: { category },
  };
}

function updateCategory(categoryId, payload) {
  const category = categories.find((category) => category.id === categoryId);

  if (!category) {
    return {
      status: 404,
      data: { message: "Categorie introuvable" },
    };
  }

  const { name } = payload;

  if (name !== undefined) {
    if (!String(name).trim()) {
      return {
        status: 400,
        data: { message: "Le nom ne peut pas etre vide" },
      };
    }

    const cleanName = String(name).trim();

    const existingCategory = categories.find(
      (item) =>
        item.name.toLowerCase() === cleanName.toLowerCase() &&
        item.id !== category.id,
    );

    if (existingCategory) {
      return {
        status: 409,
        data: { message: "Cette categorie existe deja" },
      };
    }

    category.name = cleanName;
    category.slug = generateSlug(cleanName);
  }

  category.updatedAt = new Date();

  return {
    status: 200,
    data: {
      message: "Categorie mise a jour avec succes",
      category,
    },
  };
}

function deleteCategory(categoryId) {
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId,
  );

  if (categoryIndex === -1) {
    return {
      status: 404,
      data: { message: "Categorie introuvable" },
    };
  }

  categories.splice(categoryIndex, 1);

  return {
    status: 200,
    data: { message: "Categorie supprime avec succes" },
  };
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
