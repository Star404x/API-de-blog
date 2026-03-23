const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Format du token invalide" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token invalide" });
    }

    return res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = authMiddleware;
