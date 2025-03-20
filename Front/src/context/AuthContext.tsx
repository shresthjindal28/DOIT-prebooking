// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { api } from '@/lib/api';
// import { toast } from '@/components/ui/use-toast';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'homeowner' | 'provider' | 'admin';
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string, role?: string) => Promise<void>;
//   signup: (name: string, email: string, password: string, role: 'homeowner' | 'provider') => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem('doit-token');
//       if (token) {
//         try {
//           const userData = await api.validateToken(token);
//           if (userData) {
//             // Ensure the role is one of the allowed types
//             const validatedRole = validateRole(userData.role);
//             setUser({
//               ...userData,
//               role: validatedRole
//             });
//           } else {
//             localStorage.removeItem('doit-token');
//           }
//         } catch (error) {
//           console.error('Auth initialization error:', error);
//           localStorage.removeItem('doit-token');
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();
//   }, []);

//   // Helper function to validate the role
//   const validateRole = (role: string): 'homeowner' | 'provider' | 'admin' => {
//     if (role === 'homeowner' || role === 'provider' || role === 'admin') {
//       return role;
//     }
//     return 'homeowner'; // Default fallback
//   };

//   const login = async (email: string, password: string, role?: string) => {
//     setLoading(true);
//     try {
//       const response = await api.login({ email, password, role });
//       localStorage.setItem('doit-token', response.token);
      
//       // Validate the role before setting the user
//       const validatedRole = validateRole(response.user.role);
//       setUser({
//         ...response.user,
//         role: validatedRole
//       });
      
//       toast({
//         title: "Welcome back!",
//         description: `You've successfully logged in as ${response.user.name}.`,
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       toast({
//         title: "Login failed",
//         description: "Please check your credentials and try again.",
//         variant: "destructive",
//       });
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (name: string, email: string, password: string, role: 'homeowner' | 'provider') => {
//     setLoading(true);
//     try {
//       const response = await api.signup({ name, email, password, role });
//       localStorage.setItem('doit-token', response.token);
      
//       // The role is already validated since we're passing a typed parameter
//       setUser({
//         ...response.user,
//         role: validateRole(response.user.role)
//       });
      
//       toast({
//         title: "Account created!",
//         description: `Welcome to DO!T, ${name}!`,
//       });
//     } catch (error) {
//       console.error('Signup error:', error);
//       toast({
//         title: "Signup failed",
//         description: "Please check your information and try again.",
//         variant: "destructive",
//       });
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('doit-token');
//     setUser(null);
//     toast({
//       title: "Logged out",
//       description: "You've been successfully logged out.",
//     });
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     signup,
//     logout,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";

const API_BASE_URL =  "https://porudction-back.onrender.com";

interface User {
  name: string;
  email?: string;
  role: "homeowner" | "provider" | "admin";
  adminId?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  adminLogin: (adminId: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("doit-token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        let response = await fetch(`${API_BASE_URL}/api/auth/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.log("Fetching regular user failed, checking for admin...");
          response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error("User not found");
          }
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("doit-token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("doit-token");
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token, user } = await response.json();
      localStorage.setItem("doit-token", token);
      setUser(user);

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const adminLogin = async (adminId: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, password }),
        credentials: "include", // ✅ Ensures cookies/session are included
      });
  
      const data = await response.json();
  
      console.log(data)
      if (response.ok) {
       
  
        // ✅ Corrected: Update authentication state using `setUser`
        setUser({
          name: data.user.name,
          email: data.user.email,
          role: "admin",
          adminId: data.user.adminId,
        });
  
        return true;
      } else {
        console.error("Admin login failed:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    }
  };
  
  
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, logout, isAuthenticated, isAdmin, login, adminLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
