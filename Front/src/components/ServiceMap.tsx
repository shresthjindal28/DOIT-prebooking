
import { useState, useEffect } from 'react';
import { MapPin, Users, Wrench, Zap, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock service provider data for demonstration
const serviceProviders = [
  { 
    id: 1, 
    name: 'John Smith', 
    service: 'Plumbing', 
    rating: 4.8, 
    location: { x: 30, y: 40 }, 
    icon: Wrench 
  },
  { 
    id: 2, 
    name: 'Emma Johnson', 
    service: 'Electrical', 
    rating: 4.9, 
    location: { x: 70, y: 20 }, 
    icon: Zap 
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    service: 'Appliance Repair', 
    rating: 4.7, 
    location: { x: 50, y: 60 }, 
    icon: Home 
  },
  { 
    id: 4, 
    name: 'Sarah Davis', 
    service: 'Plumbing', 
    rating: 4.6, 
    location: { x: 20, y: 70 }, 
    icon: Wrench 
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    service: 'Electrical', 
    rating: 4.8, 
    location: { x: 80, y: 50 }, 
    icon: Zap 
  },
];

const ServiceMap = () => {
  const [hoveredProvider, setHoveredProvider] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState({ x: 45, y: 45 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    // Update dimensions on resize for responsive map
    const handleResize = () => {
      const mapContainer = document.getElementById('map-container');
      if (mapContainer) {
        setWindowDimensions({
          width: mapContainer.offsetWidth,
          height: mapContainer.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate distance (simplified for demo)
  const calculateDistance = (provider: typeof serviceProviders[0]) => {
    const dx = provider.location.x - userLocation.x;
    const dy = provider.location.y - userLocation.y;
    return Math.sqrt(dx * dx + dy * dy).toFixed(1);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="h2 mb-3" style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.4)" }}>Service Providers Near You</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto"style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.2)" }}>
            Find highly-rated professionals in your area ready to help
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div id="map-container" className="h-[400px] bg-blue-50 relative">
            {/* Map background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-60"></div>
            
            {/* Grid lines for visual effect */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #3b82f61a 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* User location pin */}
            <div 
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${userLocation.x}%`,
                top: `${userLocation.y}%`
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center">
                  <Users size={12} className="text-white" />
                </div>
                <div className="mt-1 bg-white px-2 py-1 rounded-full shadow-sm text-xs font-medium">
                  You
                </div>
              </div>
            </div>
            
            {/* Service provider pins */}
            {serviceProviders.map(provider => {
              const IconComponent = provider.icon;
              return (
                <div 
                  key={provider.id}
                  className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${hoveredProvider === provider.id ? 'scale-110' : ''}`}
                  style={{
                    left: `${provider.location.x}%`,
                    top: `${provider.location.y}%`
                  }}
                  onMouseEnter={() => setHoveredProvider(provider.id)}
                  onMouseLeave={() => setHoveredProvider(null)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-doit-400 border-2 border-white shadow-lg flex items-center justify-center">
                      <IconComponent size={16} className="text-white" />
                    </div>
                    {hoveredProvider === provider.id && (
                      <div className="mt-2 bg-white px-3 py-2 rounded-lg shadow-lg z-30 absolute -top-16 w-40">
                        <div className="text-sm font-semibold">{provider.name}</div>
                        <div className="text-xs text-gray-600">{provider.service}</div>
                        <div className="text-xs font-medium flex items-center mt-1">
                          <span className="flex items-center text-amber-500">
                            ★ {provider.rating}
                          </span>
                          <span className="ml-auto text-gray-500">
                            ~{calculateDistance(provider)} miles
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Distance lines from user to providers */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {serviceProviders.map(provider => (
                <line 
                  key={provider.id}
                  x1={`${userLocation.x}%`}
                  y1={`${userLocation.y}%`}
                  x2={`${provider.location.x}%`}
                  y2={`${provider.location.y}%`}
                  stroke={hoveredProvider === provider.id ? "#f59e0b" : "#e2e8f0"}
                  strokeWidth={hoveredProvider === provider.id ? "2" : "1"}
                  strokeDasharray={hoveredProvider === provider.id ? "" : "4,4"}
                  className="transition-all duration-300"
                />
              ))}
            </svg>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-doit-400 mr-2" />
                <span className="text-sm text-gray-600">Showing <span className="font-medium">{serviceProviders.length}</span> service providers in your area</span>
              </div>
              <div className="flex gap-3">
                {[...new Set(serviceProviders.map(p => p.service))].map(service => (
                  <Card key={service} className="border-none shadow-none bg-muted">
                    <CardContent className="p-2 text-xs flex items-center gap-1">
                      {service === 'Plumbing' && <Wrench size={12} />}
                      {service === 'Electrical' && <Zap size={12} />}
                      {service === 'Appliance Repair' && <Home size={12} />}
                      {service}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
