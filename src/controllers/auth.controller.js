const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

async function login(req, res) {
  try {
    const result = await authService.login(req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  register,
  login,
};
