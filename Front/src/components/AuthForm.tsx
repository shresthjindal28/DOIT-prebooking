import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface AuthFormProps {
  mode: "login" | "signup";
  role?: "homeowner" | "provider" | "admin";
}

const AuthForm = ({ mode, role }: AuthFormProps) => {
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"homeowner" | "provider">(
    role === "provider" ? "provider" : "homeowner"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login"
            ? { email, password, role: selectedRole }
            : { name, email, password, role: selectedRole }
        ),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Authentication failed.");

      localStorage.setItem("doit-token", data.token);
      setUser(data.user); // ✅ Update AuthContext immediately

      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* <div className="space-y-2">
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
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="mobile number">Mobile Number</Label>
        <Input
          id="number"
          type="number"
          placeholder="Enter your Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
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
        <RadioGroup
          value={selectedRole}
          onValueChange={(value) =>
            setSelectedRole(value as "homeowner" | "provider")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="homeowner" id="homeowner" />
            <Label htmlFor="homeowner" className="cursor-pointer">
              Homeowner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="provider" id="provider" />
            <Label htmlFor="provider" className="cursor-pointer">
              Service Provider
            </Label>
          </div>
        </RadioGroup>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full h-12 text-white font-medium transition-all duration-300 bg-gradient-to-r from-doit-400 to-orange-500 hover:from-doit-500 hover:to-orange-600"
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
    </form>
  );
};

export default AuthForm;
