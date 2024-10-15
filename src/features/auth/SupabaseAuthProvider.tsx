'use client';
import React from 'react';
import { AuthContract, AuthContext } from './useAuth';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';

export const SupabaseAuthProvider: React.FC<{
    children: React.ReactNode;
    auth: AuthContract;
}> = ({ children }) => {
    const auth = useSupabaseAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
