
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Home, Settings2, Flower2, Paintbrush } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const featuredServices = [
  {
    title: 'Plumbing Services',
    description: 'Expert plumbers for all your home needs',
    icon: Wrench,
    link: '/services?category=plumbing',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Electrical Services',
    description: 'Professional electrical repairs and installations',
    icon: Zap,
    link: '/services?category=electrical',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    title: 'Home Appliance Repair',
    description: 'Quick fixes for all your home appliances',
    icon: Home,
    link: '/services?category=appliance',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Handyman Services',
    description: 'General repairs and maintenance for your home',
    icon: Settings2,
    link: '/services?category=handyman',
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Gardening & Landscaping',
    description: 'Transform your outdoor spaces',
    icon: Flower2,
    link: '/services?category=gardening',
    color: 'from-emerald-400 to-green-500'
  },
  {
    title: 'Painting Services',
    description: 'Professional painting for your home',
    icon: Paintbrush,
    link: '/services?category=painting',
    color: 'from-indigo-500 to-purple-500'
  }
];

const FeaturedServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="h2 mb-3">Featured Services</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our most popular services that homeowners trust and love
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <Link 
              to={service.link} 
              key={service.title}
              className="block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className={`h-full transition-all duration-300 ${
                hoveredIndex === index ? 'transform scale-105 shadow-lg' : ''
              }`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 ${
                    hoveredIndex === index ? 'transform scale-110' : ''
                  }`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-doit-500' : ''
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-foreground/70">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
