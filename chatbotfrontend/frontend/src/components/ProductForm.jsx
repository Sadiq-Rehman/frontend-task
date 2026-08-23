import { useState } from 'react';

export default function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('All fields are required.');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setError('Price must be a valid positive number.');
      return;
    }

    setError('');
    onAddProduct({ name, price: Number(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Add New Product / Custom Prompt Template</h3>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label>Product / Template Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g. Code Reviewer Bot"
        />
      </div>

      <div className="form-group">
        <label>Price / Token Cost ($)</label>
        <input 
          type="text" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="9.99"
        />
      </div>

      <button type="submit" className="form-submit-btn">Add Product</button>
    </form>
  );
}