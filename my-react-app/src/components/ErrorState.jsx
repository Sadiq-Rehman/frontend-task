import { Button } from './Button';

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
      <h3 style={{ color: '#f87171', marginBottom: '0.5rem' }}>{title}</h3>
      {message && <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{message}</p>}
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Try Again
        </Button>
      )}
    </div>
  );
}