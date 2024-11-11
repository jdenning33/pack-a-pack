'use client';
import React from 'react';
import { AuthContext } from './useAuth';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';

export const AuthProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const auth = useSupabaseAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
