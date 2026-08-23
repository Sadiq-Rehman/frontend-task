export function Analytics() {
  const stats = [
    { label: 'Total Users', value: '12,480', change: '+12%' },
    { label: 'Active Sessions', value: '1,245', change: '+5%' },
    { label: 'Conversion Rate', value: '3.45%', change: '-0.2%' },
    { label: 'Bounce Rate', value: '42.1%', change: '-1.5%' },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px' }}>
      <h1>Analytics</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Site analytics and usage reports.</p>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>{stat.label}</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#1e293b' }}>{stat.value}</div>
            <span style={{ fontSize: '0.8rem', color: stat.change.startsWith('+') ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
              {stat.change} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Traffic Overview</h3>
        <div style={{ height: '200px', background: '#f8fafc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>
          [ Chart / Graph Placeholder ]
        </div>
      </div>
    </div>
  );
}