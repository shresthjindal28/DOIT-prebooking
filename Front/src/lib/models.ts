
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'homeowner' | 'provider' | 'admin';
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
  services?: string[];
  completedBookings?: number;
}

export interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  address: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  provider?: {
    id: string;
    name: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  notes?: string;
  createdAt: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalProviders: number;
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  topServices: {
    service: string;
    count: number;
  }[];
  bookingTrends: {
    date: string;
    count: number;
  }[];
}
