import  { useState } from 'react';

export function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '0.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1rem',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          color: '#f8fafc',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 1rem 1rem 1rem', color: '#94a3b8' }}>
          {children}
        </div>
      )}
    </div>
  )
}