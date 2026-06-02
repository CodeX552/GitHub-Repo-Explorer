import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";

import API from "../api/githubApi";

import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import LanguagesCard from "../components/LanguagesCard";
import RepoList from "../components/RepoList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SortDropdown from "../components/SortDropdown";
import LoadMoreButton from "../components/LoadMoreButton";
import RecentSearches from "../components/RecentSearches";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [sortType, setSortType] = useState("updated");
  const [page, setPage] = useState(1);
  const [currentUsername, setCurrentUsername] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  const saveRecentSearch = (username) => {
    let updatedSearches = [
      username,
      ...recentSearches.filter((item) => item !== username),
    ];
    updatedSearches = updatedSearches.slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const fetchGithubUser = async (username, pageNumber = 1) => {
    const isLoadMore = pageNumber > 1;
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError("");

      const response = await API.get(
        `/github/${username}?page=${pageNumber}`
      );

      setUser(response.data.data.user);

      if (pageNumber === 1) {
        setRepos(response.data.data.repos);
      } else {
        setRepos((prev) => [...prev, ...response.data.data.repos]);
      }

      setCurrentUsername(username);
      saveRecentSearch(username);
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGithubUser(currentUsername, nextPage);
  };

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortType === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortType === "updated") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    return 0;
  });

  return (
    <div id="app-root">
      <nav className="flex items-center gap-5 px-8 py-3 bg-bg-primary border-b border-border sticky top-0 z-50 max-md:px-4" id="navbar">
        <a href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary no-underline whitespace-nowrap">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          RepoExplorer
        </a>

        <SearchBar
          onSearch={(username) => {
            setPage(1);
            fetchGithubUser(username, 1);
          }}
        />

        <ThemeToggle />
      </nav>

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
        <div className="max-w-[800px] mx-auto px-8 mt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {!user && !loading && !error && (
        <div className="flex flex-col items-center justify-center text-center py-20 px-5" id="empty-state">
          <svg className="w-20 h-20 text-text-muted mb-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Search a GitHub User</h2>
          <p className="text-sm text-text-muted max-w-[360px]">Enter a GitHub username above to explore their repositories, languages, and profile.</p>
        </div>
      )}

      {user && !loading && (
        <div className="flex max-w-[1200px] mx-auto px-8 py-6 gap-8 max-md:flex-col max-md:px-4 max-md:gap-5" id="main-layout">
          <aside className="w-70 shrink-0 max-md:w-full" id="sidebar">
            <UserCard user={user} />
            <LanguagesCard repos={repos} />
          </aside>

          <main className="flex-1 min-w-0" id="content-area">
            <div className="flex items-center justify-between mb-4 max-md:flex-col max-md:gap-3 max-md:items-start">
              <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                Repositories
                <span className="bg-bg-secondary text-text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full border border-border">{user.public_repos}</span>
              </h1>

              <SortDropdown
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>

            {sortedRepos.length > 0 && (
              <>
                <RepoList repos={sortedRepos} />
                <LoadMoreButton onLoadMore={handleLoadMore} loading={loadingMore} />
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;