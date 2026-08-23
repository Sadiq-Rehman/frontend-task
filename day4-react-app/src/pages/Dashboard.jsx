// src/pages/Dashboard.jsx
import { useOutletContext } from 'react-router-dom';

export function Dashboard() {
  // Consume layout-level state and actions
  const { user, settings, toggleTheme } = useOutletContext();

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p style={{ opacity: 0.8 }}>Welcome back, <strong>{user.name}</strong>!</p>

      {/* Interactive layout-controlled widget */}
      <div style={{ background: settings.theme === 'dark' ? '#0f172a' : '#ffffff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', marginTop: '1.5rem' }}>
        <h3>Layout Settings Control</h3>
        <p>Current Theme Mode: <strong>{settings.theme}</strong></p>
        <button
          onClick={toggleTheme}
          style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
        >
          Toggle Layout Theme
        </button>
      </div>
    </div>
  );
}