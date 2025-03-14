import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-yellow-400">DO!T</h2>
            <p className="mt-3 text-sm">
              Your all-in-one solution for connecting with professional service providers across all industries.
            </p>
            <div className="flex space-x-4 mt-4 text-gray-400">
              <FaFacebookF className="cursor-pointer hover:text-white" />
              <FaTwitter className="cursor-pointer hover:text-white" />
              <FaInstagram className="cursor-pointer hover:text-white" />
              <FaLinkedinIn className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {["Home", "Services", "About Us", "Contact", "Become a Provider"].map((item, index) => (
                <li key={index} className="hover:text-yellow-400 cursor-pointer text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="mt-3 space-y-2">
              {["Professional Services", "Home Services", "Health & Wellness", "Tech Support", "Events & Entertainment"].map((item, index) => (
                <li key={index} className="hover:text-yellow-400 cursor-pointer text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <IoLocationSharp className="text-yellow-400" />
                <span>123 Service Street, Business District, City, 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoCall className="text-yellow-400" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail className="text-yellow-400" />
                <span>contact@doit.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Subscribe to Our Newsletter</h3>
            <p className="mt-2 text-sm">Stay updated with our latest services and offers</p>
            <div className="mt-4 flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
              />
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-r hover:bg-yellow-500 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
