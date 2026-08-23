import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { signal });

        if (!response.ok) {
          throw new Error('Failed to fetch product details.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#64748b' }}>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#dc2626', marginBottom: '1rem' }}>Error: {error}</p>
        <Link to="/products" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>&larr; Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>{product?.title}</h1>
      <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>{product?.body}</p>
      <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
        Product ID: <strong>{id}</strong>
      </div>
      <Link to="/products" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>&larr; Back to Products</Link>
    </div>
  );
}