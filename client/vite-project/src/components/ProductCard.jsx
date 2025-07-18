import React from 'react';
import { addToCart } from '../api/cartAPI';

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="border rounded p-4 shadow hover:shadow-md transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
          <button
        onClick={() => addToCart(product._id)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
      </div>
    

    </>
  );
};

export default ProductCard;
