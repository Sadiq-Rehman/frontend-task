export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <p>⚠️ {message || "Something went wrong."}</p>
      {onRetry && <button onClick={onRetry} className="retry-btn">Try Again</button>}
    </div>
  );
}