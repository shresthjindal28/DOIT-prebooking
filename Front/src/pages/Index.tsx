
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import FeaturedServices from '@/components/FeaturedServices';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import ServiceMap from '@/components/ServiceMap';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-doit-100/50 to-orange-100/50 -z-10" />
        <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block bg-doit-100 text-doit-500 px-4 py-1 rounded-full text-sm font-medium tracking-wide">
              Home Services Made Simple
            </span>
            <h1 className="h1 text-doit-900">
              Your One-Stop Solution for <br />
              <span className="text-orange-600">Home Services</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg">
              DO!T connects you with skilled professionals to handle all your home service needs. From plumbing to painting, we've got you covered.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/signup">
                <Button className="btn-primary">Get Started</Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="btn-outline">Explore Services</Button>
              </Link>
            </div>
          </div>
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-video shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-doit-400/90 to-orange-500/90 mix-blend-multiply" />
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Home Service Professional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Trusted Professionals</h3>
                  <p className="text-white/90 max-w-md mx-auto">
                    Our verified experts deliver quality service every time
                  </p>
                </div>
              </div>
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
      <section className="py-20 px-4 bg-gradient-to-b from-white to-muted">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <h2 className="h2 mb-4">Our Services</h2>
            <p className="text-foreground/70">
              Whatever your home needs, we have professionals ready to help
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
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
      <section className="py-20 px-4 bg-gradient-to-r from-doit-400 to-orange-500 text-white">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Ready to Get Things Done?
            </h2>
            <p className="text-white/90 text-lg mb-8 animate-fade-in">
              Join thousands of happy homeowners who trust DO!T for their home service needs
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <Link to="/signup">
                <Button className="bg-white text-orange-600 hover:bg-white/90 px-8 py-6 text-lg font-medium">
                  Sign Up as a Homeowner
                </Button>
              </Link>
              <Link to="/signup?role=provider">
                <Button className="bg-orange-800 text-white hover:bg-orange-900 px-8 py-6 text-lg font-medium">
                  Join as a Service Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
