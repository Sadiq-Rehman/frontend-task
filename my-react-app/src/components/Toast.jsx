import  { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80' },
    error: { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171' }
  };

  const current = colors[type] || colors.success;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: current.bg,
      color: current.text,
      padding: '1rem 1.5rem',
      borderRadius: '0.375rem',
      border: `1px solid ${current.text}`,
      fontWeight: 'bold',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>✕</button>
    </div>
  );
}