import  { useState } from 'react';

export function FormShowcase() {
  // ==========================================
  // 1. LOGIN FORM STATE & VALIDATION
  // ==========================================
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    
    // Clear error for field as user types
    if (loginErrors[name]) {
      setLoginErrors({ ...loginErrors, [name]: '' });
    }
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginData.email) {
      errors.email = 'Email is required.';
    } else if (!loginData.email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!loginData.password) {
      errors.password = 'Password is required.';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      setLoginSubmitted(false);
    } else {
      setLoginErrors({});
      setLoginSubmitted(true);
    }
  };

  // ==========================================
  // 2. PROFILE FORM STATE & VALIDATION
  // ==========================================
  const [profileData, setProfileData] = useState({ fullName: '', bio: '' });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileSuccess, setProfileSuccess] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    if (profileErrors[name]) {
      setProfileErrors({ ...profileErrors, [name]: '' });
    }
  };

  const validateProfile = () => {
    const errors = {};
    if (!profileData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }
    if (profileData.bio.length > 100) {
      errors.bio = 'Bio cannot exceed 100 characters.';
    }
    return errors;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const errors = validateProfile();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setProfileSuccess(false);
    } else {
      setProfileErrors({});
      setProfileSuccess(true);
    }
  };

  // ==========================================
  // 3. PRODUCT FORM STATE & VALIDATION
  // ==========================================
  const [productData, setProductData] = useState({ name: '', price: '', stock: '' });
  const [productErrors, setProductErrors] = useState({});
  const [productSuccess, setProductSuccess] = useState(false);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    if (productErrors[name]) {
      setProductErrors({ ...productErrors, [name]: '' });
    }
  };

  const validateProduct = () => {
    const errors = {};
    if (!productData.name.trim()) {
      errors.name = 'Product name is required.';
    }
    if (!productData.price) {
      errors.price = 'Price is required.';
    } else if (Number(productData.price) <= 0) {
      errors.price = 'Price must be greater than 0.';
    }
    if (productData.stock === '' || Number(productData.stock) < 0) {
      errors.stock = 'Stock must be 0 or greater.';
    }
    return errors;
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const errors = validateProduct();
    if (Object.keys(errors).length > 0) {
      setProductErrors(errors);
      setProductSuccess(false);
    } else {
      setProductErrors({});
      setProductSuccess(true);
    }
  };

  // Common container styling helper
  const cardStyle = {
    background: '#ffffff',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    border: `1px solid ${hasError ? '#ef4444' : '#cbd5e1'}`,
    marginTop: '0.3rem',
    marginBottom: '0.2rem',
    outline: 'none',
    fontSize: '0.95rem'
  });

  const errorStyle = {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginBottom: '0.8rem',
    display: 'block'
  };

  const successStyle = {
    color: '#10b981',
    fontSize: '0.9rem',
    marginBottom: '0.8rem',
    fontWeight: '500'
  };

  const buttonStyle = {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Forms with Controlled Inputs & Validation</h2>

      {/* 1. LOGIN FORM */}
      <div style={cardStyle}>
        <h3>Login Form</h3>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Email Address</label>
            <input 
              type="text" 
              name="email"
              value={loginData.email} 
              onChange={handleLoginChange} 
              placeholder="user@example.com"
              style={inputStyle(loginErrors.email)}
            />
            {loginErrors.email && <span style={errorStyle}>{loginErrors.email}</span>}
          </div>

          <div style={{ marginTop: '0.8rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={loginData.password} 
              onChange={handleLoginChange} 
              placeholder="••••••••"
              style={inputStyle(loginErrors.password)}
            />
            {loginErrors.password && <span style={errorStyle}>{loginErrors.password}</span>}
          </div>

          {loginSubmitted && <div style={successStyle}>Login successful!</div>}

          <button type="submit" style={{ ...buttonStyle, marginTop: '1rem' }}>Log In</button>
        </form>
      </div>

      {/* 2. PROFILE FORM */}
      <div style={cardStyle}>
        <h3>User Profile Form</h3>
        <form onSubmit={handleProfileSubmit}>
          <div>
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={profileData.fullName} 
              onChange={handleProfileChange} 
              placeholder="Sadiq Rehman"
              style={inputStyle(profileErrors.fullName)}
            />
            {profileErrors.fullName && <span style={errorStyle}>{profileErrors.fullName}</span>}
          </div>

          <div style={{ marginTop: '0.8rem' }}>
            <label>Bio (Max 100 chars)</label>
            <textarea 
              name="bio"
              value={profileData.bio} 
              onChange={handleProfileChange} 
              placeholder="Tell us about yourself..."
              style={{ ...inputStyle(profileErrors.bio), height: '80px', resize: 'vertical' }}
            />
            {profileErrors.bio && <span style={errorStyle}>{profileErrors.bio}</span>}
          </div>

          {profileSuccess && <div style={successStyle}>Profile updated successfully!</div>}

          <button type="submit" style={{ ...buttonStyle, marginTop: '1rem' }}>Save Profile</button>
        </form>
      </div>

      {/* 3. PRODUCT FORM */}
      <div style={cardStyle}>
        <h3>Product Creation Form</h3>
        <form onSubmit={handleProductSubmit}>
          <div>
            <label>Product Name</label>
            <input 
              type="text" 
              name="name"
              value={productData.name} 
              onChange={handleProductChange} 
              placeholder="Spring Boot Guide"
              style={inputStyle(productErrors.name)}
            />
            {productErrors.name && <span style={errorStyle}>{productErrors.name}</span>}
          </div>

          <div style={{ marginTop: '0.8rem' }}>
            <label>Price ($)</label>
            <input 
              type="number" 
              name="price"
              value={productData.price} 
              onChange={handleProductChange} 
              placeholder="29.99"
              style={inputStyle(productErrors.price)}
            />
            {productErrors.price && <span style={errorStyle}>{productErrors.price}</span>}
          </div>

          <div style={{ marginTop: '0.8rem' }}>
            <label>Stock Quantity</label>
            <input 
              type="number" 
              name="stock"
              value={productData.stock} 
              onChange={handleProductChange} 
              placeholder="10"
              style={inputStyle(productErrors.stock)}
            />
            {productErrors.stock && <span style={errorStyle}>{productErrors.stock}</span>}
          </div>

          {productSuccess && <div style={successStyle}>Product added successfully!</div>}

          <button type="submit" style={{ ...buttonStyle, marginTop: '1rem' }}>Create Product</button>
        </form>
      </div>
    </div>
  );
}