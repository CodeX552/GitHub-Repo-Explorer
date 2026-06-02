const LoadMoreButton = ({
  onLoadMore,
}) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;