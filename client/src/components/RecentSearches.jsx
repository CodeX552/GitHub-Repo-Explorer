import { RxCross2 } from "react-icons/rx";

const RecentSearches = ({
  searches,
  onSelect,
  onClear,
}) => {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400">
          Recent:
        </p>

        <button
          onClick={onClear}
          className="text-black-400 hover:text-red-500 transition"
        >
          <RxCross2 size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {searches.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="border border-gray-500 px-4 py-1 rounded-full hover:bg-slate-700 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;