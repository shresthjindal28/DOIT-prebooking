import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star, Award, Shield, Users, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Service from '../assests/aboutus_doit.jpg';


const About = () => {
  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>About Us | DO!T - Home Services Platform</title>
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-doit-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="h1 mb-4 text-doit-900">About DO!T</h1>
            <p className="text-lg text-foreground/80 mb-8">
              We're on a mission to revolutionize how homeowners connect with
              service professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="h2 mb-4">Our Story</h2>
              <p className="text-foreground/80 mb-4">
                DO!T was founded in 2022 with a simple idea: make home services
                accessible, reliable, and hassle-free for everyone.
              </p>
              <p className="text-foreground/80 mb-4">
                We recognized that finding trusted professionals for home
                repairs and services was often a frustrating experience.
                Homeowners struggled with unreliable providers, unclear pricing,
                and scheduling challenges.
              </p>
              <p className="text-foreground/80">
                Today, DO!T connects thousands of homeowners with vetted,
                skilled professionals across numerous service categories. Our
                platform ensures quality, transparency, and convenience for both
                customers and service providers.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={Service}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-doit-400 text-white p-5 rounded-lg shadow-lg">
                <p className="text-xl font-bold">Est. 2022</p>
                <p className="text-sm">Helping homeowners thrive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="h2 mb-4">Our Core Values</h2>
            <p className="text-foreground/80">
              The principles that guide everything we do at DO!T
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Star className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-foreground/70">
                We're committed to delivering exceptional experiences through
                quality service, attention to detail, and continuous
                improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Shield className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust</h3>
              <p className="text-foreground/70">
                We build trust through transparency, reliability, and honesty in
                all our interactions with customers and providers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Users className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-foreground/70">
                We foster a supportive community that values both homeowners and
                service professionals equally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Award className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-foreground/70">
                We maintain high standards through our rigorous screening and
                ongoing evaluation of service providers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Check className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
              <p className="text-foreground/70">
                We strive to make home services booking straightforward and
                stress-free through intuitive design and clear communication.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-doit-100 flex items-center justify-center mb-4">
                <Heart className="text-doit-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Care</h3>
              <p className="text-foreground/70">
                We genuinely care about improving homes and lives through
                thoughtful service and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="h2 mb-4">Our Leadership Team</h2>
            <p className="text-foreground/80">
              Meet the dedicated people behind DO!T
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Lezcano Jorge D",
                role: "Founder",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                name: "Abdul Nasir",
                role: "Co-Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                name: "Snathosh Patel",
                role: "Co-Founder & CTO",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                name: "Jayraj Araj",
                role: " FSDE Full Stack Development Engineer",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                name: "Shresth Jindal",
                role: "FSDE Full Stack Development Engineer",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-doit-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 bg-gradient-to-r from-doit-400 to-orange-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join the DO!T Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a homeowner looking for reliable services or a
            skilled professional seeking new opportunities, DO!T has something
            for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* community links */}

            <Link to="#whatsapp-community">
              <button className="relative px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-orange-400 via-yellow-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 transition duration-300 overflow-hidden shadow-xl group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white to-transparent opacity-30 transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>
                <span className="relative z-10 flex gap-3 items-center">
                  <FaWhatsapp size={19} />
                  Join WhatsApp Community
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
