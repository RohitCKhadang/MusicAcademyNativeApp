import { create } from "zustand";

type Role = "admin" | "student" | null;

type AuthState = {
  token: string | null;
  role: Role;
  userId: number | null;
  login: (token: string, role: Role, userId: number) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  userId: null,

  login: (token, role, userId) =>
    set({ token, role, userId }),

  logout: () =>
    set({ token: null, role: null, userId: null }),
}));
