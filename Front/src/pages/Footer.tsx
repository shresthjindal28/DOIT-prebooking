import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const websiteTexts = ["🌍 Explore Our Platform"];

  const [buttonText, setButtonText] = useState(websiteTexts[0]);

  useEffect(() => {
    setButtonText(
      websiteTexts[Math.floor(Math.random() * websiteTexts.length)]
    );
  }, []);

  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61574207312609",
    twitter: "https://x.com/d0it_saas",
    instagram: "https://www.instagram.com/d0it2025",
    linkedin: "https://www.linkedin.com/company/d0it",
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-yellow-400">DO!T</h2>
            <p className="text-sm md:text-base">
              Your all-in-one solution for connecting with professional service
              providers across all industries.
            </p>
            <div className="hidden md:flex space-x-6 text-gray-400">
              <FaFacebookF
                onClick={() => window.open(socialLinks.facebook, "_blank")}
                className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
              />
              <FaTwitter
                onClick={() => window.open(socialLinks.twitter, "_blank")}
                className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
              />
              <FaInstagram
                onClick={() => window.open(socialLinks.instagram, "_blank")}
                className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
              />
              <FaLinkedinIn
                onClick={() => window.open(socialLinks.linkedin, "_blank")}
                className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Contact", "Become a Provider"].map(
                (item, index) => (
                  <li
                    key={index}
                    className="hover:text-yellow-400 cursor-pointer text-sm transition duration-300 hover:translate-x-1"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
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

        {/* Website Button and Newsletter Section */}
        <div className="mt-12  flex justify-between items-center">
          {/* Button */}
          <div className="text-center md:text-left">
            <button
              onClick={() => (window.location.href = "http://d0lt.com")}
              className="w-full md:w-auto px-8 py-3 text-lg font-semibold text-yellow-500 bg-transparent border border-white shadow-md shadow-orange-500/50 rounded-full transition duration-300 hover:shadow-orange-400/80 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms]"></div>
            </button>
          </div>

          {/* Newsletter */}
          <div className="w-[30vw] space-y-4 text-center md:text-left">
            {/* <h3 className="text-xl font-semibold text-white">Newsletter</h3> */}
            <p className="text-sm">Stay updated with our latest services and offers</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md md:rounded-r-none bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
              />
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-md md:rounded-l-none hover:bg-yellow-300 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Social Icons */}
        <div className="mt-8 md:hidden flex justify-center space-x-6 text-gray-400">
          <FaFacebookF
            onClick={() => window.open(socialLinks.facebook, "_blank")}
            className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          />
          <FaTwitter
            onClick={() => window.open(socialLinks.twitter, "_blank")}
            className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          />
          <FaInstagram
            onClick={() => window.open(socialLinks.instagram, "_blank")}
            className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          />
          <FaLinkedinIn
            onClick={() => window.open(socialLinks.linkedin, "_blank")}
            className="cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
