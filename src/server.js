require("dotenv").config();
const app = require("./app");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET manquant dans le fichier .env");
}

const PORT = process.env.PORT || 3103;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
