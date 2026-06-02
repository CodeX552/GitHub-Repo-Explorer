import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    onSearch(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-4 mb-8"
    >
      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        className="px-4 py-2 rounded text-black w-75"
      />

      <button
        type="submit"
        className="bg-blue-500 px-5 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;