import { useContext, createContext } from "react";
import type { Payload } from "@/lib/auth/jose";

interface AuthContextType {
    user: Payload | null;
    setUser: (user: Payload | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }
    return context;
}
