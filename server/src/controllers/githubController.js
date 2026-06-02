const cache = require("../utils/cache");

const { getGithubUserData } = require("../services/githubService");

const fetchGithubProfile = async (
  req,
  res,
  next
) => {
  try {
    const { username } = req.params;
    const { page = 1 } = req.query;

    if (!username || !username.trim()) {
      const error = new Error("Username is required");
      error.statusCode = 400;
      return next(error);
    }

    const cacheKey = `${username}-${page}`;

    const data = await getGithubUserData(
      username,
      page
    );

    cache.set(cacheKey, data);

    res.json({
      source: "api",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchGithubProfile,
};