'use client';
import React, { createContext, useContext } from 'react';
import { useSupabaseAuth } from '@/features/auth/useSupabaseAuth';

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
    session: Session | null;
    isSignedIn: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContract | undefined>(undefined);

export const AuthProvider: React.FC<{
    children: React.ReactNode;
    auth: AuthContract;
}> = ({ children, auth }) => {
    const value = auth;
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContract => {
    const context = useContext(AuthContext);
    const defaultContext = useSupabaseAuth();
    if (context !== undefined) {
        return context;
    }
    // If no context is found, use the default Supabase implementation
    return defaultContext;
};
