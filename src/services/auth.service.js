const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users.store");

async function register({ email, password }) {
  if (!email || !password) {
    return {
      status: 400,
      data: { message: "Email et mot de passe requis" },
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      status: 400,
      data: { message: "Email invalide" },
    };
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return {
      status: 400,
      data: { message: "Email déjà utilisé" },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
    role: "user",
  };

  users.push(newUser);

  return {
    status: 201,
    data: {
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    },
  };
}

async function login({ email, password }) {
  if (!email || !password) {
    return {
      status: 400,
      data: { message: "Email et mot de passe requis" },
    };
  }

  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      status: 401,
      data: { message: "Email ou mot de passe incorrect" },
    };
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET manquant");
    return {
      status: 500,
      data: {
        message: "Erreur serveur",
      },
    };
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
  );

  return {
    status: 200,
    data: {
      message: "Connexion réussie",
      token,
    },
  };
}

module.exports = {
  register,
  login,
};
