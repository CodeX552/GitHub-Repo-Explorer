const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const githubRoutes = require("./routes/githubRoutes");

const rateLimiter = require("./middleware/rateLimiter");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.use(rateLimiter);

app.use("/api/github", githubRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

module.exports = app;