import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-in-out
     ${isActive
       ? "text-black md:text-black font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
       : "text-black md:text-black hover:text-gray-300 md:hover:text-gray-300"}`;

  
  const mobileLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-in-out
     ${isActive
       ? "text-white font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
       : "text-white hover:text-gray-300"}`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <img src="/Logo-b.png" alt="Logo" className="w-28 h-auto" />
          </div>

         
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
              Products
            </NavLink>
            <NavLink to="/cart" className={navLinkClasses}>
              Cart
            </NavLink>
            <NavLink to="/admin/add-product" className={navLinkClasses}>
              Add Product
            </NavLink>
          </div>

         
          <div className="flex items-center space-x-4">
            
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 text-black text-sm font-medium hover:opacity-80 transition"
              >
                Get Started <ChevronDown className="w-4 h-4 inline-block ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 z-50 animate-fadeIn">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

            <button
              className="md:hidden focus:outline-none text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 shadow-lg animate-slideDown text-white">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <NavLink to="/" className={mobileLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" className={mobileLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/cart" className={mobileLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Cart
            </NavLink>
            <NavLink to="/add-product" className={mobileLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Add Product
            </NavLink>
 
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full mt-2 px-4 py-2 text-white text-sm font-medium hover:opacity-80 transition flex items-center justify-between"
              >
                <span>Get Started</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="mt-2 w-full bg-white border border-gray-300 shadow-lg z-50 animate-fadeIn">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
