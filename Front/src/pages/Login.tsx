import { Link, useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Wrench, ShieldCheck } from "lucide-react";

const Login = () => {
  const [loginMode, setLoginMode] = useState<
    "default" | "provider" | "user" | "admin"
  >("default");
  const navigate = useNavigate();

  const handleSelectMode = (mode: "provider" | "user" | "admin") => {
    if (mode === "admin") {
      navigate("/admin-login"); // Redirect to the admin login page
    } else {
      setLoginMode(mode);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col text-black ">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-t md:bg-gradient-to-l from-doit-500/90 to-orange-500/80 p-10 md:p-16 flex items-center justify-center">
          <div className="max-w-md text-white">
            <h1
              className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
            >
              Welcome Back to DO!T
            </h1>
            <p
              className="text-white/90 mb-8 animate-fade-in delay-100"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
            >
              Log in to access your account and manage your home service needs
              or provide your professional services to our users.
            </p>
            <div className="animate-fade-in delay-200">
              <p
                className="text-white/80 text-sm"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
              >
                Don't have an account?
              </p>
              <Link
                to="/signup"
                className="text-white underline hover:text-white/90 transition-colors"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-10 md:p-16 flex items-center justify-center bg-gradient-to-b md:bg-gradient-to-r from-doit-500/90 to-doit-200/80 relative overflow-hidden">

          
          <div 
            className="mt-10 w-full max-w-md z-10 p-8 rounded-xl shadow-xl border border-white/40 relative overflow-hidden bg-transparent" 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(80px)'
            }}
          >            
            <div className="mb-8 text-center md:text-left relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Login to Your Account
              </h2>
              <p className="text-gray-700">Please enter your credentials below</p>
            </div>

            {loginMode === "default" ? (
              <div className="space-y-4 animate-fade-in relative z-10">
                <p className="text-center mb-4 text-gray-800 font-medium">
                  I am a:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black">
                  <Button
                    onClick={() => handleSelectMode("user")}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-doit-50 hover:border-doit-200 transition-all shadow-xl"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <User size={40} className="mb-2 text-doit-500" />
                    <span>Homeowner</span>
                  </Button>

                  <Button
                    onClick={() => handleSelectMode("provider")}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-orange-50 hover:border-orange-200 transition-all shadow-xl"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <Wrench size={40} className="mb-2 text-orange-500" />
                    <span>Service Provider</span>
                  </Button>

                  <Button
                    onClick={() => handleSelectMode("admin")}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-32 p-4 hover:bg-gray-100 hover:border-gray-300 transition-all shadow-xl"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <ShieldCheck size={40} className="mb-2 text-gray-500" />
                    <span>Admin</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">
                    {loginMode === "user" && "Homeowner Login"}
                    {loginMode === "provider" && "Service Provider Login"}
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={() => setLoginMode("default")}
                    className="text-sm"
                  >
                    ← Back to selection
                  </Button>
                </div>
                <AuthForm
                  mode="login"
                  role={loginMode === "user" ? "homeowner" : "provider"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
