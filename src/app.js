const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(authRoutes);
app.use(userRoutes);

module.exports = app;
