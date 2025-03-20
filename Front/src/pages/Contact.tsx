import { useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Map from "@/pages/Map";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const ContactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+54 2915738993",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@d0lt.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    content: "buenos aires",
    description: "Argentina",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday to Friday, 9am-6pm",
    description: "Closed on weekends and holidays",
  },
];

const Contact = () => {
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

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(""); // Clear any errors when the user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      // Get the backend URL from Vite environment variables
      const backendUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${backendUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message sent!",
          description:
            "We've received your message and will get back to you soon.",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later."
      );

      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Contact Us | DO!T - Home Services Platform</title>
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-doit-100 via-doit-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-doit-500/10 to-orange-500/10"></div>
        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-doit-900 mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Have questions or feedback? We're here to help you make your home
              better.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 -mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ContactInfo.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50 hover:border-doit-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-doit-50 flex items-center justify-center mb-6 group-hover:bg-doit-100 transition-colors">
                  <item.icon
                    className="text-doit-600 group-hover:text-doit-700 transition-colors"
                    size={28}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-doit-900">
                  {item.title}
                </h3>
                <p className="text-foreground/90 font-medium mb-2">
                  {item.content}
                </p>
                <p className="text-foreground/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-24">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-doit-900 flex items-center">
                <MessageSquare className="mr-4 text-doit-500" size={32} />
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                {formError && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                    {formError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2" size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>

              {/* Map Section */}
              <div className="mt-12 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                {/* <div className="aspect-video w-full"> */}
                <Map />
                {/* </div> */}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-doit-900">
                Common Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I book a service?",
                    answer:
                      "Booking a service is easy! Simply create an account, browse available services, select the one you need, choose a date and time, and confirm your booking.",
                  },
                  {
                    question: "How are service providers vetted?",
                    answer:
                      "All service providers undergo a thorough background check, credential verification, and must maintain a high customer satisfaction rating to remain on our platform.",
                  },
                  {
                    question: "What if I'm not satisfied with the service?",
                    answer:
                      "Customer satisfaction is our priority. If you're not happy with a service, please contact us within 48 hours, and we'll work to make it right.",
                  },
                  {
                    question: "Can I reschedule or cancel a booking?",
                    answer:
                      "Yes, you can reschedule or cancel bookings through your account dashboard. Please note that cancellations within 24 hours of the scheduled service may incur a fee.",
                  },
                  {
                    question: "How do I become a service provider?",
                    answer:
                      "To join our network of service providers, click on 'Become a Provider' on our homepage, complete the application form, and our team will review your credentials.",
                  },
                  {
                    question: "How are service providers vetted?",
                    answer:
                      "All service providers undergo a thorough background check, credential verification, and must maintain a high customer satisfaction rating to remain on our platform.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-doit-800">
                      {faq.question}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-yellow-300 to-yellow-600">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-doit-50 to-orange-50 rounded-3xl p-12 md:p-16 shadow-lg">
            <footer className=" text-gray-900 py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {/* Brand Section */}
                  <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-yellow-400">DO!T</h2>
                    <p className="text-sm md:text-base">
                      Your all-in-one solution for connecting with professional
                      service providers across all industries.
                    </p>
                    <div className="hidden md:flex space-x-6 text-gray-400">
                      <FaFacebookF
                        onClick={() =>
                          window.open(socialLinks.facebook, "_blank")
                        }
                        className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
                      />
                      <FaTwitter
                        onClick={() =>
                          window.open(socialLinks.twitter, "_blank")
                        }
                        className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
                      />
                      <FaInstagram
                        onClick={() =>
                          window.open(socialLinks.instagram, "_blank")
                        }
                        className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
                      />
                      <FaLinkedinIn
                        onClick={() =>
                          window.open(socialLinks.linkedin, "_blank")
                        }
                        className="cursor-pointer hover:text-white transition duration-300 transform hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Quick Links
                    </h3>
                    <ul className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
                      <Link
                        to={"/"}
                        className="flex items-center justify-center md:justify-start w-full py-2 md:py-0 hover:text-yellow-400 hover:bg-white/30 md:hover:bg-transparent rounded-lg md:rounded-none cursor-pointer text-sm md:text-sm transition-all duration-300"
                      >
                        <span>Home</span>
                      </Link>
                      <Link
                        to={"/about"}
                        className="flex items-center justify-center md:justify-start w-full py-2 md:py-0 hover:text-yellow-400 hover:bg-white/30 md:hover:bg-transparent rounded-lg md:rounded-none cursor-pointer text-sm md:text-sm transition-all duration-300"
                      >
                        <span>About Us</span>
                      </Link>
                      <Link
                        to={"/contact"}
                        className="flex items-center justify-center md:justify-start w-full py-2 md:py-0 hover:text-yellow-400 hover:bg-white/30 md:hover:bg-transparent rounded-lg md:rounded-none cursor-pointer text-sm md:text-sm transition-all duration-300"
                      >
                        <span>Contact Us</span>
                      </Link>
                      <Link
                        to={"/signup"}
                        className="flex items-center justify-center md:justify-start w-full py-2 md:py-0 hover:text-yellow-400 hover:bg-white/30 md:hover:bg-transparent rounded-lg md:rounded-none cursor-pointer text-sm md:text-sm transition-all duration-300"
                      >
                        <span>Join with us</span>
                      </Link>
                    </ul>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Contact Us
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-center md:justify-start items-center space-x-2">
                        <IoLocationSharp className="text-yellow-400" />
                        <span>buenos aires, Argentina</span>
                      </li>
                      <li className="flex flex-wrap justify-center md:justify-start items-center space-x-2">
                        <IoCall className="text-yellow-400" />
                        <span>+54 2915738993</span>
                      </li>
                      <li className="flex justify-center md:justify-start items-center space-x-2">
                        <MdEmail className="text-yellow-400" />
                        <span>contact@d0lt.com</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Website Button and Newsletter Section */}
                <div className="mt-6  flex flex-col md:flex-row justify-between items-center">
                  {/* Button */}
                  <div className="text-center md:text-left">
                    <button
                      onClick={() => (window.location.href = "http://d0lt.com")}
                      className="w-full md:w-auto px-8 py-3 text-lg font-semibold text-yellow-500 bg-transparent border border-white shadow-md shadow-orange-500/50 rounded-full transition duration-300 hover:shadow-orange-400/80 hover:scale-105 relative overflow-hidden group mb-10 md:mb-0"
                    >
                      <span className="relative z-10">{buttonText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms]"></div>
                    </button>
                  </div>

                  {/* Newsletter */}
                  <div className="md:w-[28vw] space-y-4 text-center md:text-left">
                    {/* <h3 className="text-xl font-semibold text-white">Newsletter</h3> */}
                    <p className="text-sm">
                      Stay updated with our latest services and offers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded-md md:rounded-r-none bg-transparent border-gray-700 border focus:outline-none "
                      />
                      <button className="px-3 py-1 text-red-500 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-md shadow-lg transition-all duration-300 ease-in-out hover:brightness-110 font-semibold  md:rounded-l-none ">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
