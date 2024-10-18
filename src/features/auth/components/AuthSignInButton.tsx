'use client';
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from '@/ui/dialog';
import { useAuth } from '../useAuth';
import { supabase } from '@/lib/supabse/supabaseClient';

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
                                            brand: 'hsl(136 10 30)',
                                            brandAccent: 'hsl(136 10 20)',
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
