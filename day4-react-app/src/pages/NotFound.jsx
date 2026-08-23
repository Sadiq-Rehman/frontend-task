import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        style={{ background: '#2563eb', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
      >
        Go Back Home
      </Link>
    </div>
  );
}