const LoadMoreButton = ({ onLoadMore, loading }) => {
  return (
    <button
      onClick={onLoadMore}
      disabled={loading}
      className="block w-full py-3.5 mt-2 bg-bg-primary border border-border rounded-xl text-sm font-semibold font-[inherit] text-accent cursor-pointer transition-all duration-200 hover:bg-accent-light hover:border-accent disabled:opacity-60 disabled:cursor-not-allowed"
      id="load-more-btn"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        "Load More Repositories"
      )}
    </button>
  );
};

export default LoadMoreButton;