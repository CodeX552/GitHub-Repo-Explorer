import { RxCross2 } from "react-icons/rx";

const RecentSearches = ({ searches, onSelect, onClear }) => {
  if (searches.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-8 py-2 bg-bg-primary border-b border-border overflow-x-auto max-md:px-4" id="recent-searches">
      <span className="text-xs text-text-muted whitespace-nowrap">Recent:</span>

      {searches.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="px-3 py-1 border border-border rounded-full text-xs font-medium font-[inherit] text-text-secondary bg-bg-secondary cursor-pointer transition-all duration-200 whitespace-nowrap hover:border-accent hover:text-accent hover:bg-accent-light"
        >
          {item}
        </button>
      ))}

      <button onClick={onClear} className="ml-auto bg-none border-none cursor-pointer text-text-muted p-1 rounded flex items-center transition-colors duration-200 hover:text-red-600" aria-label="Clear recent searches">
        <RxCross2 size={16} />
      </button>
    </div>
  );
};

export default RecentSearches;