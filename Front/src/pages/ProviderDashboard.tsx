
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { CalendarClock, Clock, DollarSign, Star, Users, Plus, Settings, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ServiceManager from '@/components/ServiceManager';
import BookingRequests from '@/components/BookingRequests';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="h2 mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Manage your services and bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl border border-gray-100 flex items-center">
          <div className="rounded-full bg-doit-100 p-3 mr-4">
            <Users className="text-doit-600" size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Clients</p>
            <p className="text-2xl font-semibold">0</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-100 flex items-center">
          <div className="rounded-full bg-doit-100 p-3 mr-4">
            <CalendarClock className="text-doit-600" size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Appointments</p>
            <p className="text-2xl font-semibold">0</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-100 flex items-center">
          <div className="rounded-full bg-doit-100 p-3 mr-4">
            <DollarSign className="text-doit-600" size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Earnings</p>
            <p className="text-2xl font-semibold">$0</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-100 flex items-center">
          <div className="rounded-full bg-doit-100 p-3 mr-4">
            <Star className="text-doit-600" size={24} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Rating</p>
            <p className="text-2xl font-semibold">N/A</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border border-gray-100 mb-8">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="services">Manage Services</TabsTrigger>
            <TabsTrigger value="bookings">View Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>
          
          <TabsContent value="bookings">
            <BookingRequests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
