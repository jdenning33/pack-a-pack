import { useState, useEffect } from 'react';
import {
    User as SupabaseUser,
    Session as SupabaseSession,
} from '@supabase/supabase-js';
import { AuthContract, User, Session } from '@/features/auth/useAuth';
import { supabase } from '../supabaseClient';

function mapUser(supabaseUser: SupabaseUser | null): User | null {
    if (!supabaseUser) return null;
    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        emailVerified: supabaseUser.email_confirmed_at != null,
        name: supabaseUser.user_metadata?.full_name,
        avatarUrl: supabaseUser.user_metadata?.avatar_url,
    };
}

function mapSession(supabaseSession: SupabaseSession | null): Session | null {
    if (!supabaseSession) return null;
    return {
        id: supabaseSession.access_token,
        userId: supabaseSession.user.id,
        expiresAt: new Date(supabaseSession.expires_at || 0).getTime(),
    };
}

export function useSupabaseAuth(): AuthContract {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(mapSession(session));
            setUser(mapUser(session?.user ?? null));
            setIsLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(mapSession(session));
            setUser(mapUser(session?.user ?? null));
        });

        return () => subscription.unsubscribe();
    }, []);

    const isSignedIn = !!session;

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
    };

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return { user, session, isSignedIn, isLoading, signIn, signUp, signOut };
}
