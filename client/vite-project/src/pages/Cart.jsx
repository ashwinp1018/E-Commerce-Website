import React, { useEffect, useState } from 'react';
import { getCart, updateCart, removeFromCart } from '../api/cartAPI';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      toast.error('Failed to fetch cart');
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCart(productId, quantity);
      await fetchCart();
      toast.success('Cart updated!');
    } catch (err) {
      console.error('Quantity update error:', err.response?.data || err.message);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
      toast.success('Item removed from cart!');
    } catch (err) {
      console.error('Remove error:', err);
      toast.error('Failed to remove item');
    }
  };

  if (!cart) return <p className="text-center mt-32">Loading Cart...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shopping Cart Section */}
        <div className="md:col-span-2 border border-black p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <span className="text-lg font-semibold">{cart.products.length} Items</span>
          </div>

          {cart.products.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.products.map((item) => (
                <div
                  key={item.product._id}
                  className="grid grid-cols-4 gap-4 items-center border-t border-gray-300 py-4"
                >
                  {/* Product Info */}
                  <div className="col-span-2 flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover border border-black"
                    />
                    <div>
                      <h3 className="font-semibold text-black">{item.product.name}</h3>
                      <button
                        onClick={() => handleRemove(item.product._id)}
                        className="text-sm text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="border border-black px-2"
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="border border-black px-2"
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-center font-bold text-black">
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="mt-4">
                <NavLink
                  to="/products"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Continue Shopping
                </NavLink>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="border border-black p-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>{cart.products.length}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹50</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Promo Code</label>
            <input
              type="text"
              placeholder="Enter your code"
              className="w-full border border-black p-2 mb-2"
            />
            <button className="w-full bg-black text-white py-2 hover:bg-gray-900">
              Apply
            </button>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>
              ₹
              {cart.products.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              ) + 50}
            </span>
          </div>
          <button
            className="w-full bg-black text-white py-2 hover:bg-gray-900"
            onClick={() => toast.success('Proceeding to checkout...')}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
