import React, { useEffect, useState } from 'react';
import { getCart, updateCart, removeFromCart } from '../api/cartAPI';

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
        }
    };

    const handleQuantityChange = async (productId, quantity) => {
        try {
            await updateCart(productId, quantity);
            fetchCart();
        } catch (err) {
            console.error('Quantity update error:', err);
        }
    };

    const handleRemove = async (productId) => {
        console.log('Trying to remove product:', productId);
        try {
            await removeFromCart(productId);
            fetchCart();
        } catch (err) {
            console.error('Remove error:', err);
        }
    };

    if (!cart) return <p className="text-center">Loading Cart...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.products.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.products.map((item) => (
                    <div
                        key={item.product._id}
                        className="border p-4 mb-2 flex justify-between items-center"
                    >
                        <div>
                            <h3>{item.product.name}</h3>
                            <p>₹{item.product.price}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleQuantityChange(item.product._id, Number(e.target.value))
                                }
                                className="w-16 border rounded p-1"
                            />
                            <button
                                onClick={() => handleRemove(item.product._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
