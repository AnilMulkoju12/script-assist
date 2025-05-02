import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  initialize: () => void; // ✅ Add this line
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => {
    localStorage.setItem('isAuthenticated', 'true');
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authUser'); // Optional
    set({ isAuthenticated: false });
  },
  initialize: () => {
    const saved = localStorage.getItem('isAuthenticated') === 'true';
    set({ isAuthenticated: saved });
  },
}));
