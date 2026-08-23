import { Link } from 'react-router-dom';

export function Products() {
  const productList = [
    { id: 1, name: 'Spring Boot Enterprise Guide' },
    { id: 2, name: 'React UI Component Library' },
    { id: 3, name: 'Docker & Microservices Kit' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products Catalog</h1>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {productList.map(product => (
          <li key={product.id} style={{ marginBottom: '0.75rem' }}>
            <Link 
              to={`/products/${product.id}`}
              style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}
            >
              {product.name} &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}