'use client';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from '@/ui/dialog';
import { useAuth } from './useAuth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AuthSignInButton: React.FC = () => {
    const { isSignedIn, signOut } = useAuth();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Sign In</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                {isSignedIn ? (
                    <DialogDescription>
                        <div className=''>test</div>
                        You are already signed in. Please sign out to switch
                        accounts.
                        <Button variant='outline' onClick={signOut}>
                            Sign Out
                        </Button>
                    </DialogDescription>
                ) : (
                    <>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: 'red',
                                            brandAccent: 'darkred',
                                        },
                                    },
                                },
                            }}
                            providers={[]}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
