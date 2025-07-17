import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">🛒 MyShop</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin/add-product">Add Product</Link>

      </div>
    </nav>
  );
}
