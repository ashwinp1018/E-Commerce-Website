import API from './axios';

export const getCart = () =>
  API.get('/cart', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export const addToCart = (productId, quantity = 1) =>
  API.post(
    '/cart/add',
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );

export const updateCart = (productId, quantity) =>
  API.put(
    '/cart/update',
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );

export const removeFromCart = (productId) =>
  API.delete(`/cart/remove/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
