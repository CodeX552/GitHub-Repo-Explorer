import { useState, useEffect, useRef } from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const timerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!username.trim()) return;
    onSearch(username.trim());
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (username.trim()) {
        onSearch(username.trim());
      }
    }, 700);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [username]);

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-[480px] relative" id="search-form">
      <GoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        id="search-input"
        className="w-full py-2.5 pl-10 pr-4 border border-border rounded-full text-sm font-[inherit] bg-bg-secondary text-text-primary outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] focus:bg-bg-primary placeholder:text-text-muted"
      />
    </form>
  );
};

export default SearchBar;