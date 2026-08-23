export function Loader({ message = 'Loading...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
      <div style={{
        width: '30px',
        height: '30px',
        border: '3px solid rgba(255,255,255,0.1)',
        borderTop: '3px solid #38bdf8',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 0.5rem auto'
      }} />
      <span>{message}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}