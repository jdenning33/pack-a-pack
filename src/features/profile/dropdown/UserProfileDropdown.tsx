'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { User } from 'lucide-react';
import {
    ProfileModal,
    ProfileModalTrigger,
} from '@/features/profile/modal/ProfileModal';
import { useAuth } from '@/features/auth/useAuth';

export const UserProfileDropdown: React.FC = () => {
    const { user, isSignedIn, signOut } = useAuth();

    if (!isSignedIn || !user) {
        return null;
    }

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <ProfileModal>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='relative h-8 w-8 rounded-full'
                    >
                        <Avatar className='h-8 w-8'>
                            <AvatarImage
                                src={user.avatarUrl}
                                alt={user.name || user.email}
                            />
                            <AvatarFallback>
                                <User className='h-4 w-4' />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                    <ProfileModalTrigger asChild>
                        <DropdownMenuItem className='font-normal'>
                            <div className='flex flex-col space-y-1'>
                                <p className='text-sm font-medium leading-none'>
                                    {user.name || 'User'}
                                </p>
                                <p className='text-xs leading-none text-muted-foreground'>
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </ProfileModalTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ProfileModal>
    );
};
