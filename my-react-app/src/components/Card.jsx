export function Card({ 
  title, 
  count, 
  userObj, 
  skills = [], 
  onAction, 
  variant = 'primary', 
  children 
}) {
  // Component Variants styling
  const variantStyles = {
    primary: { border: '2px solid #38bdf8', backgroundColor: '#1e293b', color: '#f8fafc' },
    danger: { border: '2px solid #ef4444', backgroundColor: '#451a03', color: '#f8fafc' }
  };

  const currentStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <div style={{ padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', ...currentStyle }}>
      {/* 1. Primitives */}
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {count !== undefined && <p>Count: {count}</p>}

      {/* 2. Object */}
      {userObj && (
        <p>
          Role: {userObj.role} at {userObj.company}
        </p>
      )}

      {/* 3. Array */}
      {skills.length > 0 && (
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Skills:</p>
          <ul style={{ margin: '0 0 1rem 1.2rem', padding: 0 }}>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Callback */}
      {onAction && (
        <button 
          onClick={onAction} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginBottom: '1rem', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}
        >
          Click Callback
        </button>
      )}

      {/* 5. Children Prop */}
      {children && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}