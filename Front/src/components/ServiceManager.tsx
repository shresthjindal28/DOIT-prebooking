
import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

// Mock initial data
const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Basic Plumbing Service',
    description: 'Fixing leaks, unclogging drains, and basic plumbing repairs.',
    price: '80',
    duration: '1 hour',
  },
  {
    id: '2',
    name: 'Advanced Plumbing Installation',
    description: 'Installation of new fixtures, pipes, and plumbing systems.',
    price: '150',
    duration: '3 hours',
  },
];

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
    });
    setEditingService(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = () => {
    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newService = {
      id: Date.now().toString(),
      ...formData,
    };

    setServices(prev => [...prev, newService]);
    toast({
      title: "Service added",
      description: `"${formData.name}" has been added to your services.`,
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditService = () => {
    if (!editingService) return;
    
    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setServices(services.map(service => 
      service.id === editingService.id ? { ...service, ...formData } : service
    ));

    toast({
      title: "Service updated",
      description: `"${formData.name}" has been updated.`,
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service removed",
      description: "The service has been removed from your offerings.",
    });
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Your Services</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(true);
              }} 
              className="bg-doit-400 hover:bg-doit-500"
            >
              <Plus size={16} className="mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {editingService 
                  ? 'Update the details of your existing service.'
                  : 'Fill in the details to add a new service to your offerings.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Basic Plumbing Service"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this service includes"
                  className="min-h-24"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 1 hour"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={editingService ? handleEditService : handleAddService}
                className="bg-doit-400 hover:bg-doit-500"
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {services.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">You haven't added any services yet</p>
          <Button 
            onClick={() => setIsAddDialogOpen(true)} 
            className="bg-doit-400 hover:bg-doit-500"
          >
            <Plus size={16} className="mr-2" />
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-lg">{service.name}</h4>
                  <p className="text-muted-foreground mt-1">{service.description}</p>
                  <div className="flex items-center mt-3 space-x-4">
                    <div className="text-sm">
                      <span className="font-medium">Price:</span> ${service.price}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Duration:</span> {service.duration}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openEditDialog(service)}
                  >
                    <Pencil size={14} className="mr-1" />
                    Edit
                  </Button>
                  
                  <Dialog open={isDeleteDialogOpen && deleteId === service.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) setDeleteId(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setDeleteId(service.id)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Service</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove "{service.name}" from your offerings?
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteService(service.id)}>
                          Yes, Remove Service
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
