import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const websiteTexts = [
    "🌍 Explore Our Platform"
  ];

  const [buttonText, setButtonText] = useState(websiteTexts[0]);

  useEffect(() => {
    setButtonText(websiteTexts[Math.floor(Math.random() * websiteTexts.length)]);
  }, []);

  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61574207312609",
    twitter: "https://x.com/d0it_saas",
    instagram: "https://www.instagram.com/d0it2025",
    linkedin: "https://www.linkedin.com/company/d0it"
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-yellow-400">DO!T</h2>
            <p className="mt-2 md:mt-3 text-sm">
              Your all-in-one solution for connecting with professional service providers across all industries.
            </p>
            <div className="hidden md:flex justify-center md:justify-start space-x-4 mt-3 md:mt-4 text-gray-400">
              <FaFacebookF onClick={() => window.open(socialLinks.facebook, '_blank')} className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110" />
              <FaTwitter onClick={() => window.open(socialLinks.twitter, '_blank')} className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110" />
              <FaInstagram onClick={() => window.open(socialLinks.instagram, '_blank')} className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110" />
              <FaLinkedinIn onClick={() => window.open(socialLinks.linkedin, '_blank')} className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:mt-0">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 md:mt-3 space-y-1 md:space-y-2">
              {["Home", "About Us", "Contact", "Become a Provider"].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-400 cursor-pointer text-sm transition duration-300 hover:translate-x-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:mt-0">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mt-2 md:mt-3 space-y-2 md:space-y-3 text-sm">
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <IoLocationSharp className="text-yellow-400" />
                <span>123 Service Street, Business District, City, 10001</span>
              </li>
              <li className="flex flex-wrap justify-center md:justify-start items-center space-x-2">
                <IoCall className="text-yellow-400" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <MdEmail className="text-yellow-400" />
                <span>contact@doit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 🌍 Main Website Button */}
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => window.location.href = "http://d0lt.com"}
            className="px-8 py-3 text-lg font-semibold text-yellow-500  bg-transparent border border-white shadow-md shadow-orange-500/50 rounded-full transition duration-300 hover:shadow-orange-400/80 hover:scale-110 relative overflow-hidden before:absolute before:content-[''] before:top-0 before:-left-[100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-[1500ms] hover:before:left-[100%]"
          >
            <span className="relative z-10">{buttonText}</span>
          </button>

          {/* Social Media Icons Below the Button */}
          <div className="md:hidden flex justify-center space-x-4 mt-5 text-gray-400">
            <FaFacebookF onClick={() => window.open(socialLinks.facebook, '_blank')} className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110" />
            <FaTwitter onClick={() => window.open(socialLinks.twitter, '_blank')} className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110" />
            <FaInstagram onClick={() => window.open(socialLinks.instagram, '_blank')} className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110" />
            <FaLinkedinIn onClick={() => window.open(socialLinks.linkedin, '_blank')} className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110" />
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700 text-center">
          <h3 className="text-lg font-semibold text-white">Subscribe to Our Newsletter</h3>
          <p className="mt-2 text-sm">Stay updated with our latest services and offers</p>
          <div className="mt-4 flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l sm:rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
            />
            <button className="mt-2 sm:mt-0 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded sm:rounded-l-none rounded-r hover:bg-yellow-300 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
