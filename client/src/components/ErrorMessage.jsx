const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500 p-4 rounded text-center mb-6">
      {message}
    </div>
  );
};

export default ErrorMessage;