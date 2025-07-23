import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminAddProduct from './pages/AdminAddProduct';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Video Background */}
        <div className="fixed inset-0 -z-10">
          <video
            src="/video-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none bg-black/40"
          ></video>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

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
      </div>
    </BrowserRouter>
  );
}

export default App;
