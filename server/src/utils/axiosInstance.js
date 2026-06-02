const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.GITHUB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

module.exports = axiosInstance;