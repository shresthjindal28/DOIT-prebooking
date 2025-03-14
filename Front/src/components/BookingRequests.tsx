
import { useState } from 'react';
import { Clock, Calendar, MapPin, User, CheckCircle, XCircle, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  address: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  notes?: string;
}

// Mock data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    service: 'Basic Plumbing Service',
    date: '2023-06-15',
    time: '10:00 AM',
    address: '123 Main St, Anytown',
    customer: {
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john@example.com',
    },
    status: 'pending',
    notes: 'Leaking kitchen sink needs urgent attention.',
  },
  {
    id: '2',
    service: 'Advanced Plumbing Installation',
    date: '2023-07-20',
    time: '02:00 PM',
    address: '456 Oak Ave, Somewhere',
    customer: {
      name: 'Emily Johnson',
      phone: '555-987-6543',
      email: 'emily@example.com',
    },
    status: 'accepted',
    notes: 'Installing new bathroom fixtures.',
  },
  {
    id: '3',
    service: 'Basic Plumbing Service',
    date: '2023-08-05',
    time: '09:00 AM',
    address: '789 Pine Rd, Elsewhere',
    customer: {
      name: 'Michael Brown',
      phone: '555-456-7890',
      email: 'michael@example.com',
    },
    status: 'completed',
  },
  {
    id: '4',
    service: 'Advanced Plumbing Installation',
    date: '2023-05-10',
    time: '11:00 AM',
    address: '321 Elm St, Nowhere',
    customer: {
      name: 'Sarah Williams',
      phone: '555-789-0123',
      email: 'sarah@example.com',
    },
    status: 'declined',
    notes: 'Customer requested a different date.',
  },
];

const BookingRequests = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'declined'>('all');

  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === 'all') return true;
    return booking.status === activeFilter;
  });

  const handleStatusUpdate = (id: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    
    const statusMap = {
      'accepted': 'accepted',
      'declined': 'declined',
      'completed': 'marked as completed',
    };
    
    toast({
      title: "Status updated",
      description: `Booking has been ${statusMap[newStatus]}.`,
    });
    
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Accepted</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'declined':
        return <Badge className="bg-red-500 hover:bg-red-600">Declined</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div>
      <Tabs defaultValue={activeFilter} value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="mx-auto text-muted-foreground mb-2" size={32} />
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-card rounded-lg border border-border p-4 hover:border-doit-400/50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedBooking(booking);
                  setIsDialogOpen(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{booking.service}</h4>
                      <div className="ml-3">{getStatusBadge(booking.status)}</div>
                    </div>
                    
                    <div className="flex flex-col space-y-1 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User size={14} className="mr-2" />
                        {booking.customer.name}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-2" />
                        {booking.date} at {booking.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={14} className="mr-2" />
                        {booking.address}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(booking.id, 'accepted');
                          }}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(booking.id, 'declined');
                          }}
                        >
                          <XCircle size={14} className="mr-1" />
                          Decline
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'accepted' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(booking.id, 'completed');
                        }}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedBooking && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Complete information about this booking
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{selectedBooking.service}</h3>
                {getStatusBadge(selectedBooking.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="mt-1 mr-3 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Customer</p>
                    <p className="text-sm">{selectedBooking.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customer.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="mt-1 mr-3 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Appointment</p>
                    <p className="text-sm">{selectedBooking.date}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{selectedBooking.address}</p>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div className="flex items-start">
                    <ClipboardList className="mt-1 mr-3 text-doit-400" size={16} />
                    <div>
                      <p className="font-medium">Notes</p>
                      <p className="text-sm">{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2">
              {selectedBooking.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'declined')}
                    className="sm:w-full"
                  >
                    Decline
                  </Button>
                  <Button 
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'accepted')}
                    className="bg-doit-400 hover:bg-doit-500 sm:w-full"
                  >
                    Accept
                  </Button>
                </>
              )}
              
              {selectedBooking.status === 'accepted' && (
                <Button 
                  onClick={() => handleStatusUpdate(selectedBooking.id, 'completed')}
                  className="bg-green-500 hover:bg-green-600 w-full"
                >
                  Mark as Completed
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BookingRequests;
