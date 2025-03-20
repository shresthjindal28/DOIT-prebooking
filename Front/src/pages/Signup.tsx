
import { Link, useLocation,useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useEffect, useState } from 'react';

const Signup = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const [role, setRole] = useState<'homeowner' | 'provider'>('homeowner');
  
  useEffect(() => {
    // Check if the URL has a role parameter
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'provider') {
      setRole('provider');
    }else if (roleParam === 'admin') {
      navigate('/AdminLogin'); // Redirect to AdminLogin.tsx
    }
  }, [location,navigate]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 md:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 mt-[10px]">Create Your Account</h2>
              <p className="text-foreground/70">Join DO!T today and get things done!</p>
            </div>
            
            <AuthForm mode="signup" />
            
            <p className="mt-6 text-center md:text-left text-sm text-foreground/70">
              Already have an account?{' '}
              <Link to="/login" className="text-doit-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 bg-gradient-to-br from-doit-400 to-orange-500 p-10 md:p-16 flex items-center justify-center">
          <div className="max-w-md text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Join DO!T Today</h1>
            <p className="text-white/90 mb-8 animate-fade-in delay-100">
              {role === 'homeowner' 
                ? 'Sign up as a homeowner to access quality home services from verified professionals.' 
                : 'Sign up as a service provider to offer your professional services to thousands of homeowners.'}
            </p>
            <div className="space-y-4 animate-fade-in delay-200">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="font-semibold text-white mb-2">
                  {role === 'homeowner' ? 'As a Homeowner, you can:' : 'As a Service Provider, you can:'}
                </h3>
                <ul className="space-y-2 text-sm text-white/90">
                  {role === 'homeowner' ? (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Book services from verified professionals
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Track service appointments
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Rate and review service providers
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Manage payment methods securely
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Create your service provider profile
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Manage service requests and bookings
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Set your availability and service areas
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span> Receive secure payments through our platform
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              {role === 'homeowner' ? (
                <Link 
                  to="/signup?role=provider" 
                  className="block text-center py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/20 text-white"
                >
                  I'm a Service Provider
                </Link>
              ) : (
                <Link 
                  to="/signup" 
                  className="block text-center py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/20 text-white"
                >
                  I'm a Homeowner
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
