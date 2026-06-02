const express = require("express");

const router = express.Router();

const cacheMiddleware = require(
  "../middleware/cacheMiddleware"
);

const {
  fetchGithubProfile,
} = require("../controllers/githubController");

router.get(
  "/:username",
  cacheMiddleware,
  fetchGithubProfile
);

module.exports = router;