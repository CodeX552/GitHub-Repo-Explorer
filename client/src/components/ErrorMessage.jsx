const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3.5 rounded-xl text-sm text-center mb-5 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400" id="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;