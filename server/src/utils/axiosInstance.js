const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.GITHUB_BASE_URL,
});

module.exports = axiosInstance;