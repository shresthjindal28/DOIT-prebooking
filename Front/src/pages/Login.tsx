import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Wrench, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [loginMode, setLoginMode] = useState<'default' | 'provider' | 'user' | 'admin'>('default');

  const handleSelectMode = (mode: 'provider' | 'user' | 'admin') => {
    setLoginMode(mode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-doit-400 to-orange-500 p-10 md:p-16 flex items-center justify-center">
          <div className="max-w-md text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Welcome Back to DO!T</h1>
            <p className="text-white/90 mb-8 animate-fade-in delay-100">
              Log in to access your account and manage your home service needs or provide your professional services to our users.
            </p>
            <div className="animate-fade-in delay-200">
              <p className="text-white/80 text-sm">Don't have an account?</p>
              <Link to="/signup" className="text-white underline hover:text-white/90 transition-colors">
                Create an account
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-10 md:p-16 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Login to Your Account</h2>
              <p className="text-foreground/70">Please enter your credentials below</p>
            </div>
            
            {loginMode === 'default' ? (
              <div className="space-y-4 animate-fade-in">
                <p className="text-center mb-4">I am a:</p>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleSelectMode('user')} 
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-doit-50 hover:border-doit-200 transition-all"
                  >
                    <User size={40} className="mb-2 text-doit-500" />
                    <span>Homeowner</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectMode('provider')} 
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-orange-50 hover:border-orange-200 transition-all"
                  >
                    <Wrench size={40} className="mb-2 text-orange-500" />
                    <span>Service Provider</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectMode('admin')} 
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-gray-100 hover:border-gray-300 transition-all"
                  >
                    <ShieldCheck size={40} className="mb-2 text-gray-500" />
                    <span>Admin</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="font-medium">
                    {loginMode === 'user' && 'Homeowner Login'}
                    {loginMode === 'provider' && 'Service Provider Login'}
                    {loginMode === 'admin' && 'Admin Login'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    onClick={() => setLoginMode('default')}
                    className="text-sm"
                  >
                    ← Back to selection
                  </Button>
                </div>
                <AuthForm 
                  mode="login" 
                  role={loginMode === 'user' ? 'homeowner' : loginMode === 'provider' ? 'provider' : 'admin'} 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;