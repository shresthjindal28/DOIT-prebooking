
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/admin/UserManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import Analytics from '@/components/admin/Analytics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('analytics');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, bookings, and view platform analytics</p>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="bookings">Booking Management</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="analytics" className="mt-0">
            <Analytics />
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-0">
            <BookingManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
