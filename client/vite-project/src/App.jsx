import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import AdminAddProduct from './pages/AdminAddProduct';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Particles from './components/Particles';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      {/* Particles Background */}
      <div className="fixed inset-0 -z-10">
        <Particles id="particles" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: { background: '#333', color: '#fff' },
          },
          error: {
            style: { background: '#ff3333', color: '#fff' },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
