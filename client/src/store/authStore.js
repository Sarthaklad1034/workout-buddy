import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

            clearAuth: () => {
                localStorage.removeItem('token'); // Clear stored token
                set({ user: null, isAuthenticated: false });
            },

            logout: () => {
                useAuthStore.getState().clearAuth(); // Call clearAuth correctly
            }
        }), {
            name: 'auth-storage', // Key for localStorage
            getStorage: () => localStorage // Use localStorage
        }
    )
);

export default useAuthStore;