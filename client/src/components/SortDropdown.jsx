const SortDropdown = ({
  sortType,
  setSortType,
}) => {
  return (
    <div className="flex justify-end max-w-6xl mx-auto mb-6">
      <select
        value={sortType}
        onChange={(e) =>
          setSortType(e.target.value)
        }
        className="bg-slate-800 text-white px-4 py-2 rounded border border-slate-600 outline-none"
      >
        <option value="stars">
          Sort by Stars
        </option>

        <option value="name">
          Sort by Name
        </option>

        <option value="updated">
          Sort by Last Updated
        </option>
      </select>
    </div>
  );
};

export default SortDropdown;