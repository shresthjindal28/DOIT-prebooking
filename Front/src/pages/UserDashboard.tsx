
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { CalendarClock, Search, User, Clock, Home, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ServiceBrowser from '@/components/ServiceBrowser';
import BookingForm from '@/components/BookingForm';
import BookingHistory from '@/components/BookingHistory';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="h2 mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Manage your service requests and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Quick Actions</h3>
            <Search className="text-doit-400" size={20} />
          </div>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setActiveTab('browse')}
            >
              <Search className="mr-2" size={16} />
              Find a Service
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setActiveTab('book')}
            >
              <CalendarClock className="mr-2" size={16} />
              Schedule Appointment
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setActiveTab('history')}
            >
              <Clock className="mr-2" size={16} />
              View Booking History
            </Button>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Upcoming Appointments</h3>
            <CalendarClock className="text-doit-400" size={20} />
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No upcoming appointments</p>
            <Button 
              className="mt-4 bg-doit-400 hover:bg-doit-500"
              onClick={() => setActiveTab('book')}
            >
              Book a Service
            </Button>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No recent activity</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border border-gray-100 mb-8">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse Services</TabsTrigger>
            <TabsTrigger value="book">Book a Service</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <ServiceBrowser />
          </TabsContent>
          
          <TabsContent value="book">
            <BookingForm />
          </TabsContent>
          
          <TabsContent value="history">
            <BookingHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
