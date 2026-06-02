const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-15 gap-4" id="loading-spinner">
      <div className="w-9 h-9 border-3 border-border border-t-accent rounded-full animate-spin"></div>
      <span className="text-sm text-text-muted">Fetching data...</span>
    </div>
  );
};

export default LoadingSpinner;