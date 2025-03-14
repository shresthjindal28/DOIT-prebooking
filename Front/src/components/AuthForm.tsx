
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
  role?: "homeowner" | "provider" | "admin";
}

const AuthForm = ({ mode, role }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobnumber, setMobnumber] = useState("");

  const [selectedRole, setSelectedRole] = useState<"homeowner" | "provider">(role === "provider" ? "provider" : "homeowner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        // Pass the role to login function
        await login(email, password, role);
        
        // Redirect based on role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "provider") {
          navigate("/dashboard"); // This will redirect to provider dashboard based on user role
        } else {
          navigate("/dashboard"); // This will redirect to user dashboard based on user role
        }
      } else {
        await signup(name, email, password, selectedRole);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Authentication failed. Please check your information and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-fill admin credentials if in admin mode
  useEffect(() => {
    if (role === "admin") {
      setEmail("admin@doit.com");
      setPassword("admin123");
    }
  }, [role]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="number">Mobile Number</Label>
        <Input
          id="number"
          type="number"
          placeholder="Enter your Mobile Number"
          value={mobnumber}
          onChange={(e) => setMobnumber(e.target.value)}
          required
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12"
        />
      </div>
      
      {mode === "signup" && role !== "admin" && (
        <div className="space-y-2">
          <Label>I am a:</Label>
          <RadioGroup 
            value={selectedRole} 
            onValueChange={(value) => setSelectedRole(value as "homeowner" | "provider")} 
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homeowner" id="homeowner" />
              <Label htmlFor="homeowner" className="cursor-pointer">Homeowner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="provider" id="provider" />
              <Label htmlFor="provider" className="cursor-pointer">Service Provider</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <Button
        type="submit"
        className={`w-full h-12 text-white font-medium transition-all duration-300 ${
          role === "admin" 
            ? "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900" 
            : role === "provider"
            ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
            : "bg-gradient-to-r from-doit-400 to-orange-500 hover:from-doit-500 hover:to-orange-600"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : mode === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>
      
      {role === "admin" && (
        <p className="text-xs text-center text-muted-foreground mt-2">
          Demo Admin: admin@doit.com / admin123
        </p>
      )}
    </form>
  );
};

import { useEffect } from "react";

export default AuthForm;
