import { useState } from 'react';
import { Search, Wrench, Lightbulb, Hammer, Home, Paintbrush, Bug, Flower2, FileText, Thermometer, Shield, ShowerHead, Truck, Heart, Car, Cpu, CalendarDays, Users, HelpCircle, Monitor } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ServiceCard from '@/components/ServiceCard';

const AVAILABLE_SERVICES = [
  { title: 'Plumbing Services', description: 'Fix leaks, installations, and repairs', icon: Wrench },
  { title: 'Electrical Services', description: 'Wiring, fixtures, and electrical repairs', icon: Lightbulb },
  { title: 'Carpentry Services', description: 'Furniture repair and custom woodwork', icon: Hammer },
  { title: 'Home Appliance Repair', description: 'Fix appliances and household equipment', icon: Home },
  { title: 'Painting Services', description: 'Interior and exterior painting', icon: Paintbrush },
  { title: 'Pest Control', description: 'Removal and prevention of pests', icon: Bug },
  { title: 'Gardening & Landscaping', description: 'Garden maintenance and design', icon: Flower2 },
  { title: 'Home Renovation', description: 'Major and minor home renovations', icon: FileText },
  { title: 'AC & HVAC Services', description: 'Installation and repair of climate systems', icon: Thermometer },
  { title: 'Home Security', description: 'Security system installation and monitoring', icon: Shield },
  { title: 'Laundry Services', description: 'Washing, dry cleaning, and ironing', icon: ShowerHead },
  { title: 'Moving & Relocation', description: 'Packing, moving, and setup services', icon: Truck },
  { title: 'Wellness & Lifestyle', description: 'In-home fitness, nutrition, and wellness', icon: Heart },
  { title: 'Vehicle Services', description: 'Car maintenance and repair at home', icon: Car },
  { title: 'Smart Home', description: 'Smart device installation and setup', icon: Cpu },
  { title: 'Event Support', description: 'Party planning and event services', icon: CalendarDays },
  { title: 'Handyman Services', description: 'General repairs and maintenance', icon: Wrench },
  { title: 'IT & Technical Support', description: 'Computer and tech support at home', icon: Monitor }
];

const ServiceBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServices = AVAILABLE_SERVICES.filter(
    service => service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 relative">
        <Input
          placeholder="Search for a service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
      </div>
      
      {searchTerm && filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceBrowser;
