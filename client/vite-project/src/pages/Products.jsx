import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="text-green-600 font-bold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
