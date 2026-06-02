const cache = require("../utils/cache");

const cacheMiddleware = (req, res, next) => {
  const { username } = req.params;
  const { page = 1 } = req.query;

  const cacheKey = `${username}-${page}`;

  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json({
      source: "cache",
      data: cachedData,
    });
  }

  next();
};

module.exports = cacheMiddleware;