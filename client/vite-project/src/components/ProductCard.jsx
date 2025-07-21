import React from 'react';
import { addToCart } from '../api/cartAPI';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const handleAddToCart = async (id) => {
    try {
      await addToCart(id);

      // Custom Toast
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            {/* Product Image */}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-l-lg"
                src={product.image}
                alt={product.name}
              />
            </div>

            {/* Text & Button */}
            <div className="flex-1 p-4">
              <p className="text-sm font-medium text-gray-900">
                {product.name} added to cart!
              </p>
              <NavLink
                to="/cart"
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                onClick={() => toast.dismiss(t.id)}
              >
                View Cart
              </NavLink>
            </div>

            {/* Close Button */}
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                ✕
              </button>
            </div>
          </div>
        ),
        { duration: 3000 }
      );
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="border border-black bg-white p-4 transition-all hover:shadow-lg flex flex-col items-center">
      {/* Product Image */}
      <div className="w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
        <p className="text-gray-800 font-bold text-lg mt-2">₹{product.price}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(product._id)}
        className="mt-4 w-full bg-black text-white py-2 text-sm uppercase tracking-wide hover:bg-gray-900 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
