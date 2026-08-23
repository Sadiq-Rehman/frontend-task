export function FormInput({ label, type = 'text', name, value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.7rem',
          borderRadius: '6px',
          border: `1px solid ${error ? '#dc2626' : '#cbd5e1'}`,
          fontSize: '0.95rem',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
      {error && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{error}</span>}
    </div>
  );
}