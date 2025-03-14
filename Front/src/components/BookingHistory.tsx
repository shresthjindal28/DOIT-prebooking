
import { useState } from 'react';
import { CalendarClock, Clock, CheckCircle, XCircle, Trash2, CalendarRange } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const MOCK_BOOKINGS = [
  {
    id: '1',
    service: 'Plumbing Services',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'completed',
    provider: 'John Plumber',
    address: '123 Main St, Anytown',
  },
  {
    id: '2',
    service: 'Electrical Services',
    date: '2023-07-20',
    time: '02:00 PM',
    status: 'upcoming',
    provider: 'Electric Emma',
    address: '456 Oak Ave, Somewhere',
  },
  {
    id: '3',
    service: 'Painting Services',
    date: '2023-08-05',
    time: '09:00 AM',
    status: 'upcoming',
    provider: 'Pablo Painters',
    address: '789 Pine Rd, Elsewhere',
  },
  {
    id: '4',
    service: 'Carpentry Services',
    date: '2023-05-10',
    time: '11:00 AM',
    status: 'canceled',
    provider: 'Wooden Wanda',
    address: '321 Elm St, Nowhere',
  },
];

const BookingHistory = () => {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'completed' | 'canceled'>('all');

  const filteredBookings = bookings.filter(booking => {
    if (selectedFilter === 'all') return true;
    return booking.status === selectedFilter;
  });

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'canceled' } : booking
    ));
    
    toast({
      title: "Booking canceled",
      description: "Your booking has been successfully canceled.",
    });
    
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    
    toast({
      title: "Booking deleted",
      description: "Your booking has been removed from your history.",
    });
    
    setIsDeleteDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500 hover:bg-red-600">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Your Bookings</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className={selectedFilter === 'all' ? 'bg-muted' : ''}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={selectedFilter === 'upcoming' ? 'bg-muted' : ''}
            onClick={() => setSelectedFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={selectedFilter === 'completed' ? 'bg-muted' : ''}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={selectedFilter === 'canceled' ? 'bg-muted' : ''}
            onClick={() => setSelectedFilter('canceled')}
          >
            Canceled
          </Button>
        </div>
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="mx-auto text-muted-foreground mb-2" size={32} />
          <p className="text-muted-foreground">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-card rounded-lg border border-border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{booking.service}</h4>
                  <p className="text-sm text-muted-foreground">Provider: {booking.provider}</p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <CalendarClock className="mr-1" size={14} />
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{booking.address}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(booking.status)}
                  
                  {booking.status === 'upcoming' && (
                    <div className="flex space-x-2 mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Reschedule</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reschedule Appointment</DialogTitle>
                            <DialogDescription>
                              This feature is coming soon. You'll be able to select a new date and time.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={isDeleteDialogOpen && deleteId === booking.id} onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open);
                        if (!open) setDeleteId(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setDeleteId(booking.id)}
                          >
                            Cancel
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Booking</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel this booking? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>No, Keep It</Button>
                            <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)}>Yes, Cancel Booking</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                  
                  {booking.status === 'canceled' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setDeleteId(booking.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Dialog open={isDeleteDialogOpen && deleteId !== null && bookings.find(b => b.id === deleteId)?.status === 'canceled'} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this canceled booking from your history?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>No, Keep It</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDeleteBooking(deleteId)}>Yes, Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingHistory;
