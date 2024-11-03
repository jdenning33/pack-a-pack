'use client';
import { Profile } from '@/lib/appTypes';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';
import { createContext, useContext } from 'react';

export interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    name?: string;
    avatarUrl?: string;
}

export interface Session {
    id: string;
    userId: string;
    expiresAt: number;
}

export interface AuthContract {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    isSignedIn: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContract | undefined>(undefined);

export const useAuth = (): AuthContract => {
    const context = useContext(AuthContext);
    const defaultContext = useSupabaseAuth();
    if (context !== undefined) {
        return context;
    }
    // If no context is found, use the default Supabase implementation
    return defaultContext;
};
