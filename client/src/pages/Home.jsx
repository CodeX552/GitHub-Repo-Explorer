import { useState, useEffect } from "react";

import API from "../api/githubApi";

import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SortDropdown from "../components/SortDropdown";
import LoadMoreButton from "../components/LoadMoreButton";
import RecentSearches from "../components/RecentSearches";

const Home = () => {
  const [user, setUser] = useState(null);

  const [repos, setRepos] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [sortType, setSortType] =
    useState("stars");

  const [page, setPage] = useState(1);

  const [
    currentUsername,
    setCurrentUsername,
  ] = useState("");

  const [
    recentSearches,
    setRecentSearches,
  ] = useState([]);

  useEffect(() => {
    const savedSearches =
      JSON.parse(
        localStorage.getItem(
          "recentSearches"
        )
      ) || [];

    setRecentSearches(savedSearches);
  }, []);

  const saveRecentSearch = (
    username
  ) => {
    let updatedSearches = [
      username,
      ...recentSearches.filter(
        (item) => item !== username
      ),
    ];

    updatedSearches =
      updatedSearches.slice(0, 5);

    setRecentSearches(updatedSearches);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedSearches)
    );
  };

  const fetchGithubUser = async (
    username,
    pageNumber = 1
  ) => {
    try {
      setLoading(true);

      setError("");

      const response = await API.get(
        `/github/${username}?page=${pageNumber}`
      );

      setUser(response.data.data.user);

      if (pageNumber === 1) {
        setRepos(response.data.data.repos);
      } else {
        setRepos((prev) => [
          ...prev,
          ...response.data.data.repos,
        ]);
      }

      setCurrentUsername(username);

      saveRecentSearch(username);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearRecentSearches = () => {
  localStorage.removeItem(
    "recentSearches"
  );

  setRecentSearches([]);
};

  const handleLoadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);

    fetchGithubUser(
      currentUsername,
      nextPage
    );
  };

  const sortedRepos = [...repos].sort(
    (a, b) => {
      if (sortType === "stars") {
        return (
          b.stargazers_count -
          a.stargazers_count
        );
      }

      if (sortType === "name") {
        return a.name.localeCompare(
          b.name
        );
      }

      if (sortType === "updated") {
        return (
          new Date(b.updated_at) -
          new Date(a.updated_at)
        );
      }

      return 0;
    }
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        GitHub Repo Explorer
      </h1>

      <SearchBar
        onSearch={(username) => {
          setPage(1);

          fetchGithubUser(username, 1);
        }}
      />

      <RecentSearches
  searches={recentSearches}
  onSelect={(username) => {
    setPage(1);

    fetchGithubUser(username, 1);
  }}
  onClear={clearRecentSearches}
/>

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage message={error} />
      )}

      {user && <UserCard user={user} />}

      {repos.length > 0 && (
        <SortDropdown
          sortType={sortType}
          setSortType={setSortType}
        />
      )}

      {sortedRepos.length > 0 && (
        <>
          <RepoList repos={sortedRepos} />

          <LoadMoreButton
            onLoadMore={handleLoadMore}
          />
        </>
      )}
    </div>
  );
};

export default Home;