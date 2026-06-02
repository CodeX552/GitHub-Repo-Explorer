const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  GITHUB_BASE_URL:
    process.env.GITHUB_BASE_URL,
};