import { useState } from "react";
import { Helmet } from "react-helmet";
import ServiceBrowser from "@/components/ServiceBrowser";
import { Button } from "@/components/ui/button";
import Service from '../assests/service.png';
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Services | DO!T - Home Services Platform</title>
      </Helmet>

      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-doit-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img
                src={Service}
                alt="Professional service providers"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <h1 className="h1 text-doit-900 text-3xl md:text-4xl lg:text-5xl"  style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.6)" }}>Our Services</h1>
              <p className="text-base md:text-lg text-foreground/80" style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.4)" }}>
              From general maintenance to specialized services,
               we connect you with skilled professionals for all your needs. 
               <br/>Browse our categories below.
              </p>
              <p className="text-sm md:text-md text-foreground/70" style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.2)" }}>
              Our platform ensures Top-quality service through Verified Professionals,
              Transparent Pricing, and a Seamless Booking Experience.
              Whether it's General Maintenance, Repairs, or Specialized Technical Services, 
              we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Browse Section */}
      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="h2 mb-3 text-2xl md:text-3xl lg:text-4xl" style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.4)" }}>Browse All Services</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base"  style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.2)" }}>
              Find the perfect service for your home needs with our extensive
              network of verified professionals
            </p>
          </div>

          <ServiceBrowser />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-14 bg-doit-400/10">
        <div className="container-custom px-4 md:px-0">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto text-center">
            <h3 className="h3 mb-4 text-xl md:text-2xl"  style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.6)" }}>Don't see what you're looking for?</h3>
            <p className="text-foreground/70 mb-6 text-sm md:text-base"  style={{ textShadow: "2px 2px 4px rgba(128, 128, 128, 0.4)" }}>
              We're constantly expanding our network of service providers.<br/>
              Contact us to request a service or learn more about becoming a
              provider.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to={"/signup"} className="btn-primary w-full md:w-auto"  >Request a Service</Link>
              <Link to={"/signup"} className="btn-outline w-full md:w-auto"  >
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
