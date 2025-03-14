
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ServiceBrowser from '@/components/ServiceBrowser';
import { Button } from '@/components/ui/button';
import FeaturedServices from '@/components/FeaturedServices';

const Services = () => {
  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Services | DO!T - Home Services Platform</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-doit-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="h1 mb-4 text-doit-900">Our Services</h1>
            <p className="text-lg text-foreground/80 mb-8">
              From home repairs to specialized services, we connect you with skilled professionals for all your needs. Browse our categories below.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Services Section */}
      <FeaturedServices />
      
      {/* Services Browse Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="h2 mb-3">Browse All Services</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Find the perfect service for your home needs
            </p>
          </div>
          
          <ServiceBrowser />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-14 bg-doit-400/10">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto text-center">
            <h3 className="h3 mb-4">Don't see what you're looking for?</h3>
            <p className="text-foreground/70 mb-6">
              We're constantly expanding our network of service providers.
              Contact us to request a service or learn more about becoming a provider.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-primary">Request a Service</Button>
              <Button variant="outline" className="btn-outline">Become a Provider</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
