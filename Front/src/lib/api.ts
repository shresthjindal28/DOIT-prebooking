
interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
  role: 'homeowner' | 'provider';
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// In a real app, these would be actual API calls to a backend
export const api = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Special case for admin login
        if (credentials.email === 'admin@doit.com' && credentials.password === 'admin123') {
          resolve({
            token: 'mock-jwt-token-admin-' + Math.random().toString(36).substring(2, 15),
            user: {
              id: '5',
              name: 'Admin User',
              email: credentials.email,
              role: 'admin',
            },
          });
          return;
        }

        // This is a mock response - in a real app, this would come from a backend
        resolve({
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
          user: {
            id: '1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: credentials.role as 'homeowner' | 'provider' || 'homeowner',
          },
        });
      }, 800);
    });
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is a mock response - in a real app, this would come from a backend
        resolve({
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
          user: {
            id: '1',
            name: credentials.name,
            email: credentials.email,
            role: credentials.role,
          },
        });
      }, 800);
    });
  },

  validateToken: async (token: string): Promise<AuthResponse['user'] | null> => {
    // Simulate API call to validate token
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would send the token to your backend to validate
        if (token && token.startsWith('mock-jwt-token-')) {
          if (token.includes('admin')) {
            resolve({
              id: '5',
              name: 'Admin User',
              email: 'admin@doit.com',
              role: 'admin',
            });
          } else if (token.includes('provider')) {
            resolve({
              id: '1',
              name: 'Validated Provider',
              email: 'provider@example.com',
              role: 'provider',
            });
          } else {
            resolve({
              id: '1',
              name: 'Validated User',
              email: 'user@example.com',
              role: 'homeowner',
            });
          }
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
};
