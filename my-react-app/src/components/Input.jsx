export function Input({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  error, 
  required = false 
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          {label} {required && '*'}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: error ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: '#0f172a',
          color: '#fff',
          boxSizing: 'border-box'
        }}
      />
      {error && <span style={{ display: 'block', color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{error}</span>}
    </div>
  );
}