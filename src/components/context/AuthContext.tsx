import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';
import axios from 'axios';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'api-key': API_KEY
            }
          });

          const userData = response.data;
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const googleLogin = async (token: string, isTestUser: boolean) => {
    setIsLoading(true);
    try {
      let tokenValue = token;
      if (isTestUser) {
        const testItem = localStorage.getItem('testInfo');

        if (testItem) {
          const { user } = JSON.parse(testItem)
          tokenValue = user.id
        } else {
          tokenValue = 'test'
        }
      }

      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY
        },
        body: JSON.stringify({
          token: tokenValue,        // The OAuth token from Google
          is_test_user: isTestUser  // Boolean flag for test user
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 429) {
          toast.error(`${error.error} ${error.message}`, { duration: 4000 });
        }

        throw new Error(error.message);
      }

      const { token: jwtToken, user, firstTime, message } = await response.json();
      localStorage.setItem('token', jwtToken);

      if (isTestUser) {
        const testInfo = {
          user: user
        };
        localStorage.setItem('testInfo', JSON.stringify(testInfo));
      }

      if (jwtToken && firstTime && !isTestUser) {
        const response = await fetch(`${API_BASE_URL}/job/setup-gmail-push`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'api-key': API_KEY
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
      }

      const testUserMessage = message ? message : 'Test User Created Successfully!';
      const userMessage = message ? message : 'User signed in successfully!';
      const finalMessage = (isTestUser) ? userMessage : testUserMessage;
      toast.success(finalMessage, { duration: 4000 });
      user.firstTimeLogin = firstTime

      if(firstTime){
        const onboardingData = {
          "onboarding": 0,
          "completed": false,
        }
        localStorage.setItem('onboarding', JSON.stringify(onboardingData));
      }
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      setUser,
      googleLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};