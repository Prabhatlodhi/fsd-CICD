const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading" data-testid="loading-spinner">
      {message}
    </div>
  );
};

export default LoadingSpinner;