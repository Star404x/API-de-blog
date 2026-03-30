const paginate = require("../utils/paginate");
const users = require("../data/users.store");

function getMe(userId) {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return {
      status: 404,
      data: { message: "Utilisateur introuvable" },
    };
  }

  return {
    status: 200,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

function getProfile(decodedUser) {
  return {
    status: 200,
    data: {
      message: "Profil récupéré avec succès",
      data: decodedUser,
    },
  };
}

function getAllUsers(query) {
  const search = query.search ? String(query.search).trim().toLowerCase() : "";

  const safeUsers = users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.role,
  }));

  let filteredUsers = safeUsers;

  if (search) {
    filteredUsers = sageUsers.filter((user) => {
      const email = user.email ? user.email.toLowerCase() : "";
      const role = user.role ? user.role.toLowerCase() : "";

      return email.includes(search) || role.includes(search);
    });
  }

  const result = paginate(filteredUsers, query.page, query.limit);

  return {
    status: 200,
    data: {
      message: "Liste des utilisateurs",
      filters: {
        search: search || null,
      },
      data: result.data,
      meta: result.meta,
    },
  };
}

function getUserById(userId) {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return {
      status: 404,
      data: { message: "Utilisateur introuvable" },
    };
  }

  return {
    status: 200,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

function updateUser(userId, payload) {
  const { email, role } = payload;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return {
      status: 404,
      data: { message: "Utilisateur introuvable" },
    };
  }

  if (email) {
    const emailAlreadyUsed = users.find(
      (u) => u.email === email && u.id !== user.id,
    );

    if (emailAlreadyUsed) {
      return {
        status: 409,
        data: { message: "Email déjà utilisé" },
      };
    }

    user.email = email;
  }

  if (role) {
    const allowedRoles = ["admin", "user"];

    if (!allowedRoles.includes(role)) {
      return {
        status: 400,
        data: { message: "Role invalide" },
      };
    }

    user.role = role;
  }

  return {
    status: 200,
    data: {
      message: "Utilisateur mis à jour avec succès",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
  };
}

function deleteUser(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return {
      status: 404,
      data: { message: "Utilisateur introuvable" },
    };
  }

  users.splice(userIndex, 1);

  return {
    status: 200,
    data: { message: "Utilisateur supprimé avec succès" },
  };
}

module.exports = {
  getMe,
  getProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
