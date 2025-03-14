
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    description: 'Mon-Fri, 9am-6pm EST'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'support@doit-services.com',
    description: 'We respond within 24 hours'
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    content: '123 Service Avenue, Tech City',
    description: 'CA 94103, United States'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Monday to Friday, 9am-6pm',
    description: 'Closed on weekends and holidays'
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Contact Us | DO!T - Home Services Platform</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-doit-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="h1 mb-4 text-doit-900">Contact Us</h1>
            <p className="text-lg text-foreground/80 mb-8">
              Have questions or feedback? We're here to help! Get in touch with our team.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ContactInfo.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                  <item.icon className="text-doit-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground font-medium">{item.content}</p>
                <p className="text-foreground/60 text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="mr-2 text-doit-400" size={24} />
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2" size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "How do I book a service?",
                    answer: "Booking a service is easy! Simply create an account, browse available services, select the one you need, choose a date and time, and confirm your booking."
                  },
                  {
                    question: "How are service providers vetted?",
                    answer: "All service providers undergo a thorough background check, credential verification, and must maintain a high customer satisfaction rating to remain on our platform."
                  },
                  {
                    question: "What if I'm not satisfied with the service?",
                    answer: "Customer satisfaction is our priority. If you're not happy with a service, please contact us within 48 hours, and we'll work to make it right."
                  },
                  {
                    question: "Can I reschedule or cancel a booking?",
                    answer: "Yes, you can reschedule or cancel bookings through your account dashboard. Please note that cancellations within 24 hours of the scheduled service may incur a fee."
                  },
                  {
                    question: "How do I become a service provider?",
                    answer: "To join our network of service providers, click on 'Become a Provider' on our homepage, complete the application form, and our team will review your credentials."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-foreground/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section (placeholder) */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="rounded-xl overflow-hidden shadow-lg h-80 relative bg-gray-200">
            {/* This would be replaced with an actual map component in a real implementation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-foreground/60 text-lg">
                Interactive map placeholder - Would show our location
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-doit-400/20 to-orange-500/20 rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-foreground/70 mb-6">
                Subscribe to our newsletter for the latest service updates, promotions, and home maintenance tips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter your email"
                  className="h-12 flex-grow"
                />
                <Button className="h-12 btn-primary">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-foreground/60 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from DO!T.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
