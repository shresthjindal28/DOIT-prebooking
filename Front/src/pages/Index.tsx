import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import FeaturedServices from '@/components/FeaturedServices';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import ServiceMap from '@/components/ServiceMap';
import gsap from 'gsap';
// import videobg from '@/assets/video-bg.mp4';
import videobg from '../assests/video-bg.mp4'

import Footer from "./Footer";

import {
  Wrench,
  Zap,
  Hammer,
  Settings2,
  PaintBucket,
  Bug,
  Flower2,
  Building,
  Thermometer,
  Shield,
  Shirt,
  Truck,
  Heart,
  Car,
  Home,
  PartyPopper,
  Star,
  Computer,
} from 'lucide-react';

const services = [
  {
    title: 'Plumbing Services',
    description: 'Professional plumbing repairs and installations for your home',
    icon: Wrench,
  },
  {
    title: 'Electrical Services',
    description: 'Certified electricians for all your electrical needs',
    icon: Zap,
  },
  {
    title: 'Carpentry Services',
    description: 'Custom woodwork and carpentry solutions',
    icon: Hammer,
  },
  {
    title: 'Home Appliance Repair',
    description: 'Fast and reliable repairs for all your home appliances',
    icon: Settings2,
  },
  {
    title: 'Painting Services',
    description: 'Transform your space with professional painting services',
    icon: PaintBucket,
  },
  {
    title: 'Pest Control',
    description: 'Effective pest management solutions for a pest-free home',
    icon: Bug,
  },
  {
    title: 'Gardening & Landscaping',
    description: 'Create and maintain beautiful outdoor spaces',
    icon: Flower2,
  },
  {
    title: 'Home Renovation',
    description: 'Complete home renovation and remodeling services',
    icon: Building,
  },
  {
    title: 'AC & HVAC Services',
    description: 'Installation, maintenance and repair of heating and cooling systems',
    icon: Thermometer,
  },
  {
    title: 'Home Security',
    description: 'Protect your home with modern security solutions',
    icon: Shield,
  },
  {
    title: 'Laundry Services',
    description: 'Professional laundry and dry cleaning services',
    icon: Shirt,
  },
  {
    title: 'Moving & Relocation',
    description: 'Stress-free moving and relocation services',
    icon: Truck,
  },
  {
    title: 'Wellness & Lifestyle',
    description: 'Services to enhance your wellbeing and lifestyle',
    icon: Heart,
  },
  {
    title: 'Vehicle Services',
    description: 'Maintenance and care for your vehicles',
    icon: Car,
  },
  {
    title: 'Smart Home Services',
    description: 'Smart home installation and integration',
    icon: Home,
  },
  {
    title: 'Event Support',
    description: 'Professional support for hosting events at home',
    icon: PartyPopper,
  },
  {
    title: 'Specialized Services',
    description: 'Unique and specialized home services',
    icon: Star,
  },
  {
    title: 'Handyman Services',
    description: 'General repairs and maintenance for your home',
    icon: Wrench,
  },
  {
    title: 'IT & Technical Support',
    description: 'Technical support for your home office and devices',
    icon: Computer,
  },
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // GSAP animation for background image
    gsap.fromTo(
      bgImageRef.current,
      {
        // scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        {/* Background video */}
        <div ref={bgImageRef} className="absolute inset-0 w-full h-[95vh]">
          <video
            src={videobg}
            muted
            loop 
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-doit-100/50 to-orange-100/10 z-10" />
        
        {/* Content */}
        <div className={`absolute inset-0 z-20 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-[45vh] sm:pt-[50vh] md:pt-[45vh] lg:pt-[30vh] xl:pt-[45vh] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
            <span className="inline-block text-doit-600 px-4 py-1 rounded-full text-sm sm:text-base lg:text-lg font-bold tracking-wide hover:text-doit-700">
              Home Services Made Simple
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-doit-900 mt-2 sm:mt-3 md:mt-4 mb-2">
              Your One-Stop Solution for <br className="hidden sm:block" />
              <span className="text-orange-600">Home Services</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl font-semibold text-black/90 max-w-lg mx-auto mt-2 sm:mt-4 mb-2">
              DO!T connects you with skilled professionals to handle all your home service needs. 
              <span className="block mt-1 sm:mt-2">From plumbing to painting, we've got you covered.</span>
              <span className="block mt-1 sm:mt-2">Experienced professionals, guaranteed quality, and 24/7 support.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 w-full sm:w-auto">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="btn-primary w-full sm:w-auto px-6 py-2 text-sm sm:text-base">Get Started</Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="btn-outline w-full sm:w-auto px-6 py-2 text-sm sm:text-base">Explore Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <FeaturedServices />
      
      {/* Testimonials Section */}
      <TestimonialsSlider />
      
      {/* Service Map Section */}
      <ServiceMap />

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-muted">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-foreground/70 text-base sm:text-lg">
              Whatever your home needs, we have professionals ready to help
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-gradient-to-r from-doit-400 to-orange-500 text-white">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl font-bold mb-4 md:mb-5 lg:mb-6 animate-fade-in">
              Ready to Get Things Done?
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 md:mb-7 lg:mb-8 animate-fade-in">
              Join thousands of happy homeowners who trust DO!T for their home service needs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-fade-in">
              <Link to="/signup" className="w-full sm:w-auto md:flex-1 md:max-w-xs">
                <Button className="w-full sm:w-auto md:w-full bg-white text-orange-600 hover:bg-white/90 px-6 sm:px-8 py-3 md:py-4 lg:py-6 text-base md:text-lg font-medium">
                  Sign Up as a Homeowner
                </Button>
              </Link>
              <Link to="/signup?role=provider" className="w-full sm:w-auto md:flex-1 md:max-w-xs">
                <Button className="w-full sm:w-auto md:w-full bg-orange-800 text-white hover:bg-orange-900 px-6 sm:px-8 py-3 md:py-4 lg:py-6 text-base md:text-lg font-medium">
                  Join as a Service Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Index;
