function Button({ children, onClick, disabled, type = "submit", className = "" }) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`custom-btn ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;