import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
