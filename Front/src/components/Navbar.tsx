import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { ShoppingCart } from "lucide-react";

import Logo from "@/assests/Doitlogo.png";
import {
  Menu,
  X,
  Home,
  LogIn,
  UserPlus,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Calendar,
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      // Cleanup function to restore scrolling when component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 lg:px-6">
        {/* Desktop Navigation - Changed from md to lg */}
        <div className="hidden lg:flex items-center md:space-x-4 flex-grow">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-doit-400 tracking-tight animate-pulse-gentle">
              <img className="h-8 w-9" src={Logo} alt="logo" />
            </span>
          </Link>
          {/* Left-side Links - Adjusted spacing */}
          <div className="flex space-x-2 lg:space-x-4">
            <a
              href="#"
              className="text-black hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-black hover:text-white transition-colors"
            >
              Services
            </a>
          </div>

          {/* Search Bar - Responsive width */}
            <div className="flex items-center w-full lg:w-[22vw] xl:w-[25vw] 2xl:w-[30vw] ">
            <SearchBar
              onFilterChange={(category) => {
              // Handle the category change here
              console.log("Selected category:", category);
              }}
            />
            </div>

          {/* Right-side Links - Adjusted spacing */}
          <div className="flex space-x-2 lg:space-x-4 ml-auto items-center">
            <a
              href="#"
              className="text-black hover:text-white transition-colors"
            >
              Enterprise
            </a>
            <a
              href="#"
              className="text-black hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-black hover:text-white transition-colors"
            >
              Support
            </a>
          </div>

          {/* Contact Us and Log In aligned in same line with a gap */}
          <div className="flex items-center space-x-4 ml-auto">
            <a
              href="#"
              className="text-black hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
          
        </div>

        {/* Authentication buttons - Changed from md to lg */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group flex">
              <Button
                className="bg-yellow-500 hover:bg-yellow-500 text-black rounded-full"
                onClick={() => navigate("/bid")}
              >
                Place your Bid
              </Button>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-foreground hover:bg-muted"
              >
                <span>{user?.name}</span>
                <ChevronDown size={16} />
              </Button>
              <div className="absolute right-0 mt-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-1 rounded-md bg-white">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/appointments"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <Calendar size={16} className="mr-2" />
                    Appointments
                  </Link>
                  <Link
                    to="/settings"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
              </div>
            </div>
                  <Button variant="ghost" className="text-black" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
          ) : (
            <>
              <div className="flex gap-1">
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-primary flex items-center bg-yellow-400 hover:bg-yellow-500 text-red-500 ">
                    <UserPlus size={16} />
                    <span>Join Us - It's Free</span>
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile/Tablet menu button - Updated breakpoint */}

          <div className="lg:hidden flex items-center justify-between w-full p-2 z-50">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-doit-400 tracking-tight animate-pulse-gentle">
                <img className="h-8 w-9" src={Logo} alt="logo" />
              </span>
            </Link>
          <button
            className="text-black p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>

      </div>

      {/* Mobile/Tablet menu - Updated breakpoint and styling */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out pt-20 overflow-y-auto`}
      >
        <div className="flex flex-col space-y-4 p-4 md:p-6">
          <div className="flex flex-col space-y-2 md:w-3/4 mx-auto">
            <SearchBar
              onFilterChange={(category) => {
                console.log("Selected category:", category);
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Link
              to="/"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Home size={16} className="mr-3" />
              Home
            </Link>
            
            <Link
              to="/services"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              Services
            </Link>

            <Link
              to="/enterprise"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              Enterprise
            </Link>

            <Link
              to="/blog"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              Blog
            </Link>

            <Link
              to="/support"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              Support
            </Link>

            <Link
              to="/contact"
              className="flex items-center text-foreground py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 md:w-3/4 md:mx-auto">
            {isAuthenticated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div className="px-4 py-2 text-sm text-gray-500">
                  Signed in as <strong>{user?.name}</strong>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <User size={16} className="mr-3" />
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Calendar size={16} className="mr-3" />
                  Appointments
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Settings size={16} className="mr-3" />
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center py-3 px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 px-4">
                <Link to="/login" className="w-full">
                  <Button className="w-full justify-center" variant="outline">
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black justify-center">
                    <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
