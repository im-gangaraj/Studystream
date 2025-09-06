import { create } from 'zustand';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Simulated login - In production, this would call an API
    const mockUser: User = {
      id: email === 'admin@edulearn.com' ? 'admin-1' : 'student-1',
      email,
      name: email === 'admin@edulearn.com' ? 'Admin User' : 'Student User',
      role: email === 'admin@edulearn.com' ? 'admin' : 'student',
      createdAt: new Date(),
    };
    
    set({ user: mockUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(mockUser));
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },
  
  register: async (email: string, password: string, name: string) => {
    // Simulated registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'student',
      createdAt: new Date(),
    };
    
    set({ user: newUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(newUser));
  },
}));

// Check for saved user on app load
const savedUser = localStorage.getItem('user');
if (savedUser) {
  useAuth.setState({ user: JSON.parse(savedUser), isAuthenticated: true });
}