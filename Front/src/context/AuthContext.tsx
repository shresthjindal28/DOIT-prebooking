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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface User {
  name: string;
  email: string;
  role: "homeowner" | "provider" | "admin";
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
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
        const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem("doit-token");
          setUser(null);
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
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

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};