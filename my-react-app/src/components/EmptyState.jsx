import { Button } from './Button';

export function EmptyState({ title = 'No Data Found', description, actionLabel, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
      <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>{title}</h3>
      {description && <p style={{ marginBottom: '1rem' }}>{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}