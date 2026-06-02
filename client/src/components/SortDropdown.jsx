const SortDropdown = ({ sortType, setSortType }) => {
  return (
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
      className="sort-dropdown flex items-center gap-1.5 py-2 pl-3.5 pr-8 bg-bg-primary border border-border rounded-lg text-[13px] font-medium font-[inherit] text-text-secondary cursor-pointer outline-none transition-all duration-200 hover:border-accent focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
      id="sort-dropdown"
    >
      <option value="updated">Recently Updated</option>
      <option value="stars">Most Stars</option>
      <option value="name">Name (A-Z)</option>
    </select>
  );
};

export default SortDropdown;