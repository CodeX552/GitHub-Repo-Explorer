const axiosInstance = require(
  "../utils/axiosInstance"
);

const getGithubUserData = async (
  username,
  page = 1
) => {
  const userResponse =
    await axiosInstance.get(
      `/users/${username}`
    );

  const repoResponse =
    await axiosInstance.get(
      `/users/${username}/repos`,
      {
        params: {
          per_page: 10,
          page,
        },
      }
    );

  return {
    user: userResponse.data,
    repos: repoResponse.data,
  };
};

module.exports = {
  getGithubUserData,
};