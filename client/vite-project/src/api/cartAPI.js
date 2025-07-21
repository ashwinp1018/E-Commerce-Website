import API from './axios';

// Fetch cart
export const getCart = () => {
  console.log('Fetching cart...');
  return API.get('/cart', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

// Add product to cart
export const addToCart = (productId, quantity = 1) => {
  console.log(`Adding product ${productId} with quantity ${quantity} to cart...`);
  return API.post(
    '/cart/add',
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );
};

// Update product quantity in cart
export const updateCart = (productId, quantity) => {
  if (!productId || quantity < 1) {
    console.error('Invalid productId or quantity for updateCart:', productId, quantity);
    return Promise.reject('Invalid productId or quantity');
  }

  console.log(`Updating product ${productId} to quantity ${quantity}...`);
  return API.put(
    '/cart/update',
    { productId, quantity },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );
};

// Remove product from cart
export const removeFromCart = (productId) => {
  console.log(`Removing product ${productId} from cart...`);
  return API.delete(`/cart/remove/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
