
import { User, Booking, AnalyticsData } from './models';

// Mock data for users
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'homeowner',
    createdAt: '2023-03-15',
    status: 'active',
    completedBookings: 5
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    role: 'homeowner',
    createdAt: '2023-04-20',
    status: 'active',
    completedBookings: 3
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'provider',
    createdAt: '2023-02-10',
    status: 'active',
    services: ['Plumbing Services', 'Home Appliance Repair'],
    completedBookings: 12
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'provider',
    createdAt: '2023-05-05',
    status: 'active',
    services: ['Electrical Services', 'Smart Home Services'],
    completedBookings: 8
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@doit.com',
    role: 'admin',
    createdAt: '2023-01-01',
    status: 'active'
  },
  {
    id: '6',
    name: 'David Miller',
    email: 'david@example.com',
    role: 'homeowner',
    createdAt: '2023-06-15',
    status: 'inactive',
    completedBookings: 1
  },
  {
    id: '7',
    name: 'Jennifer Taylor',
    email: 'jennifer@example.com',
    role: 'provider',
    createdAt: '2023-07-01',
    status: 'suspended',
    services: ['Painting Services', 'Home Renovation'],
    completedBookings: 4
  }
];

// Generate more bookings for the mock data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    service: 'Plumbing Services',
    date: '2023-06-15',
    time: '10:00 AM',
    address: '123 Main St, Anytown',
    customer: {
      id: '1',
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john@example.com',
    },
    provider: {
      id: '3',
      name: 'Michael Brown',
    },
    status: 'completed',
    notes: 'Leaking kitchen sink fixed.',
    createdAt: '2023-06-10',
  },
  {
    id: '2',
    service: 'Electrical Services',
    date: '2023-07-20',
    time: '02:00 PM',
    address: '456 Oak Ave, Somewhere',
    customer: {
      id: '2',
      name: 'Emily Johnson',
      phone: '555-987-6543',
      email: 'emily@example.com',
    },
    provider: {
      id: '4',
      name: 'Sarah Williams',
    },
    status: 'confirmed',
    notes: 'Installing new light fixtures.',
    createdAt: '2023-07-15',
  },
  {
    id: '3',
    service: 'Smart Home Services',
    date: '2023-08-05',
    time: '09:00 AM',
    address: '789 Pine Rd, Elsewhere',
    customer: {
      id: '1',
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john@example.com',
    },
    provider: {
      id: '4',
      name: 'Sarah Williams',
    },
    status: 'pending',
    createdAt: '2023-08-01',
  },
  {
    id: '4',
    service: 'Plumbing Services',
    date: '2023-08-10',
    time: '11:00 AM',
    address: '321 Elm St, Nowhere',
    customer: {
      id: '2',
      name: 'Emily Johnson',
      phone: '555-987-6543',
      email: 'emily@example.com',
    },
    provider: {
      id: '3',
      name: 'Michael Brown',
    },
    status: 'canceled',
    notes: 'Customer requested cancellation.',
    createdAt: '2023-08-05',
  },
  {
    id: '5',
    service: 'Home Renovation',
    date: '2023-08-15',
    time: '10:00 AM',
    address: '555 Cedar Ln, Anytown',
    customer: {
      id: '6',
      name: 'David Miller',
      phone: '555-222-3333',
      email: 'david@example.com',
    },
    provider: {
      id: '7',
      name: 'Jennifer Taylor',
    },
    status: 'pending',
    createdAt: '2023-08-10',
  },
  {
    id: '6',
    service: 'Painting Services',
    date: '2023-08-18',
    time: '09:00 AM',
    address: '777 Maple Dr, Somewhere',
    customer: {
      id: '1',
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john@example.com',
    },
    provider: {
      id: '7',
      name: 'Jennifer Taylor',
    },
    status: 'confirmed',
    notes: 'Living room and kitchen painting.',
    createdAt: '2023-08-12',
  },
  {
    id: '7',
    service: 'Home Appliance Repair',
    date: '2023-08-20',
    time: '02:00 PM',
    address: '888 Birch Ave, Elsewhere',
    customer: {
      id: '2',
      name: 'Emily Johnson',
      phone: '555-987-6543',
      email: 'emily@example.com',
    },
    provider: {
      id: '3',
      name: 'Michael Brown',
    },
    status: 'confirmed',
    notes: 'Refrigerator repair.',
    createdAt: '2023-08-15',
  },
];

// Mock analytics data
const MOCK_ANALYTICS: AnalyticsData = {
  totalUsers: 4,
  totalProviders: 3,
  totalBookings: 7,
  completedBookings: 1,
  pendingBookings: 2,
  topServices: [
    { service: 'Plumbing Services', count: 2 },
    { service: 'Electrical Services', count: 1 },
    { service: 'Smart Home Services', count: 1 },
    { service: 'Home Renovation', count: 1 },
    { service: 'Painting Services', count: 1 },
  ],
  bookingTrends: [
    { date: '2023-06', count: 1 },
    { date: '2023-07', count: 1 },
    { date: '2023-08', count: 5 },
  ],
};

export const adminApi = {
  // User management
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USERS);
      }, 500);
    });
  },

  updateUserStatus: async (userId: string, status: User['status']): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = MOCK_USERS.find(user => user.id === userId);
        if (updatedUser) {
          updatedUser.status = status;
        }
        resolve(updatedUser as User);
      }, 500);
    });
  },

  // Booking management
  getBookings: async (): Promise<Booking[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_BOOKINGS);
      }, 500);
    });
  },

  updateBookingStatus: async (bookingId: string, status: Booking['status']): Promise<Booking> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBooking = MOCK_BOOKINGS.find(booking => booking.id === bookingId);
        if (updatedBooking) {
          updatedBooking.status = status;
        }
        resolve(updatedBooking as Booking);
      }, 500);
    });
  },

  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ANALYTICS);
      }, 500);
    });
  },
};
