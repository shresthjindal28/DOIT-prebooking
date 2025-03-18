import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import Logo from "@/assests/Doitlogo.png";
import {
  Menu,
  X,
  ChevronDown
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex  justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img className="h-10 w-12" src={Logo} alt="logo" />
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-6 border px-3 py-2 rounded-full bg-white">
          <Link to="/services" className="text-black transition-colors duration-300 hover:text-red-600">Services</Link>
          <Link to="/about" className="text-black transition-colors duration-300 hover:text-red-600">About Us</Link>
          <Link to="/contact" className="text-black transition-colors duration-300 hover:text-red-600">Contact Us</Link>
        </nav>
        
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group flex">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full" onClick={() => navigate("/bid")}>
                Place your Bid
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>{user?.name}</span>
                <ChevronDown size={16} />
              </Button>
              <div className="absolute right-0 mt-8 w-48 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                <Link to="/appointments" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Appointments</Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">Logout</button>
              </div>
              <Button variant="ghost" className="text-black" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="flex items-center">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full">Join Us - It's Free</Button>
              </Link>
            </>
          )}
        </div>
        <button className="lg:hidden text-black p-2" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white p-4 z-40 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="py-2 transition-colors duration-300 hover:text-red-600">Home</Link>
            <Link to="/services" className="py-2 transition-colors duration-300 hover:text-red-600">Services</Link>
            <Link to="/about" className="py-2 transition-colors duration-300 hover:text-red-600">About Us</Link>
            <Link to="/contact" className="py-2 transition-colors duration-300 hover:text-red-600">Contact Us</Link>
          </nav>
          <div className="border-t border-gray-200 pt-4 mt-4">
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-600">Signed in as {user?.name}</p>
                <Link to="/dashboard" className="block py-2">Dashboard</Link>
                <button onClick={logout} className="w-full text-left py-2 text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="w-full mt-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full mt-2 bg-yellow-400">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
