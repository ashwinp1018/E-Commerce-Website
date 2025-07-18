import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out 
     ${isActive
       ? "text-blue font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
       : "text-black hover:text-white hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-300"}`;

  return (
    <nav
      className="w-full bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">
              <img src="/Logo.png" alt="Logo" className="w-30 h-auto inline-block" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 border-l border-gray-300 pl-6 ">
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
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Get Started Dropdown (Desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2  bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm font-medium shadow hover:scale-105 transform transition-transform duration-300 ease-in-out flex items-center space-x-1"
              >
                <span>Get Started</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300  shadow-lg z-50 animate-fadeIn">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

           
            <button
              className="md:hidden focus:outline-none text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-90 shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/cart" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Cart
            </NavLink>
            <NavLink to="/add-product" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Add Product
            </NavLink>

            {/* Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full mt-2 px-4 py-2  bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm font-medium shadow hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-between"
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
                    to="/user"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    User
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
