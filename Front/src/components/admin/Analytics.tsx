
import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/admin-api';
import { AnalyticsData } from '@/lib/models';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { toast } from '@/components/ui/use-toast';
import {
  Users,
  UserCheck,
  FileText,
  CheckSquare,
  HourglassIcon,
} from 'lucide-react';

const COLORS = ['#F7C948', '#FD9B46', '#FC7F22', '#E25822', '#C03F19'];

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminApi.getAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          title: "Error",
          description: "Failed to load analytics data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-doit-400"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Homeowners using the platform
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalProviders}</div>
            <p className="text-xs text-muted-foreground">
              Professionals offering services
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              Service bookings made
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.completedBookings}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed bookings
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Monthly booking activity</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.bookingTrends}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} bookings`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Bar dataKey="count" fill="#F7C948" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
            <CardDescription>Most requested services</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.topServices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="service"
                  label={({ service }) => service}
                  labelLine={false}
                >
                  {analyticsData.topServices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${value} bookings`, props.payload.service]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Bookings waiting for confirmation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <HourglassIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-medium">{analyticsData.pendingBookings}</span>
            <span className="text-muted-foreground text-sm">awaiting provider confirmation</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
