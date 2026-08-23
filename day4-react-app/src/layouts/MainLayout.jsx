import { Outlet, Link } from 'react-router-dom';

export function MainLayout() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Shared Header / Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2563eb' }}>MyApp</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: '600', color: '#1e293b' }}>Home</Link>
          <Link to="/about" style={{ textDecoration: 'none', fontWeight: '600', color: '#1e293b' }}>About</Link>
          <Link to="/products" style={{ textDecoration: 'none', fontWeight: '600', color: '#1e293b' }}>Products</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: '600', color: '#2563eb' }}>Dashboard &rarr;</Link>
        </div>
      </nav>

      {/* Outlet renders the matched child route component */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}