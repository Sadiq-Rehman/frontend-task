export function Avatar({ src, name = 'User', size = 'md' }) {
  const getInitials = (str) => {
    return str.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
  };

  const dimensions = size === 'lg' ? '60px' : size === 'sm' ? '30px' : '40px';

  return (
    <div style={{
      width: dimensions,
      height: dimensions,
      borderRadius: '50%',
      backgroundColor: '#475569',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontWeight: 'bold',
      fontSize: size === 'lg' ? '1.2rem' : '0.9rem'
    }} title={name}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}