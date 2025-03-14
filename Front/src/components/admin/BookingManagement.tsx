
import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/admin-api';
import { Booking } from '@/lib/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  User,
  UserCog,
  CheckCircle,
  XCircle,
  ClipboardList,
  Filter,
} from 'lucide-react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await adminApi.getBookings();
        setBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let result = bookings;
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        booking => 
          booking.service.toLowerCase().includes(term) || 
          booking.customer.name.toLowerCase().includes(term) ||
          booking.address.toLowerCase().includes(term)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter]);

  const handleStatusUpdate = async (bookingId: string, status: Booking['status']) => {
    try {
      const updatedBooking = await adminApi.updateBookingStatus(bookingId, status);
      setBookings(bookings.map(booking => booking.id === bookingId ? updatedBooking : booking));
      
      const statusMap: Record<Booking['status'], string> = {
        'pending': 'marked as pending',
        'confirmed': 'confirmed',
        'completed': 'marked as completed',
        'canceled': 'canceled',
      };
      
      toast({
        title: "Status updated",
        description: `Booking has been ${statusMap[status]}.`,
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500 hover:bg-red-600">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-doit-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Service</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date & Time</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDialogOpen(true);
                    }}
                  >
                    <td className="p-4 align-middle">{booking.service}</td>
                    <td className="p-4 align-middle">{booking.customer.name}</td>
                    <td className="p-4 align-middle">{booking.date} at {booking.time}</td>
                    <td className="p-4 align-middle">{getStatusBadge(booking.status)}</td>
                    <td className="p-4 align-middle">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(booking);
                          setIsDialogOpen(true);
                        }}
                      >
                        <UserCog size={16} className="mr-2" />
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedBooking && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                View and manage booking information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{selectedBooking.service}</h3>
                {getStatusBadge(selectedBooking.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Customer</p>
                    <p className="text-sm">{selectedBooking.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customer.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customer.phone}</p>
                  </div>
                </div>
                
                {selectedBooking.provider && (
                  <div className="flex items-start gap-3">
                    <UserCog className="mt-0.5 text-doit-400" size={16} />
                    <div>
                      <p className="font-medium">Provider</p>
                      <p className="text-sm">{selectedBooking.provider.name}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm">{selectedBooking.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm">{selectedBooking.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 text-doit-400" size={16} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{selectedBooking.address}</p>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div className="flex items-start gap-3">
                    <ClipboardList className="mt-0.5 text-doit-400" size={16} />
                    <div>
                      <p className="font-medium">Notes</p>
                      <p className="text-sm">{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row-reverse gap-2">
              <Select 
                defaultValue={selectedBooking.status}
                onValueChange={(value) => handleStatusUpdate(selectedBooking.id, value as Booking['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirm</SelectItem>
                  <SelectItem value="completed">Complete</SelectItem>
                  <SelectItem value="canceled">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BookingManagement;
