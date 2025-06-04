const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error" data-testid="error-message">
      <h2>❌ Error</h2>
      <p data-testid="error-text">{error}</p>
      <button onClick={onRetry} className="retry-btn" data-testid="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;