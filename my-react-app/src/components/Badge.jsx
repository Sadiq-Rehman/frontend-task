export function Badge({ children, variant = 'medium' }) {
  const getBadgeStyle = (v) => {
    switch (v.toLowerCase()) {
      case 'high': return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' };
      case 'low': return { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' };
      default: return { backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#facc15' };
    }
  };

  return (
    <span style={{
      padding: '0.2rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      ...getBadgeStyle(variant)
    }}>
      {children}
    </span>
  );
}