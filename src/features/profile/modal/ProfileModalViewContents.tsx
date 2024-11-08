'use client';
import React from 'react';
import { Button } from '@/ui/button';
import { DialogHeader, DialogTitle } from '@/ui/dialog';
import { Label } from '@/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Pencil, User } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useAuth } from '../../auth/useAuth';
import { useProfileModal } from './ProfileModal';

export function ProfileModalViewContents() {
    const { isEditing, setIsEditing } = useProfileModal();
    const { user, profile } = useAuth();

    if (isEditing || !user || !profile) return null;
    return (
        <>
            <DialogHeader>
                <div className='flex items-center space-x-4'>
                    <Avatar className='w-16 h-16 text-3xl'>
                        <AvatarImage
                            src={user.avatarUrl}
                            alt={user.name || user.email}
                        />

                        <AvatarFallback>
                            <User className='h-6 w-6' />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <DialogTitle>
                            {profile.username || 'Anonymous User'}
                        </DialogTitle>
                        <DialogDescription>{user.email}</DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <div className='space-y-6'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label asChild>
                            <p> Location</p>
                        </Label>
                        <p>{profile.location || 'Not specified'}</p>
                    </div>
                    <div>
                        <Label asChild>
                            <p>Preferred Weight Format</p>
                        </Label>
                        <p>
                            {profile.preferredWeightFormat === 'kg'
                                ? 'Kilograms (kg)'
                                : profile.preferredWeightFormat === 'lbs'
                                ? 'Pounds (lbs)'
                                : 'Pounds + Ounces (lbs, oz)'}
                        </p>
                    </div>
                </div>
                <div>
                    <Label asChild>
                        <p>Brief</p>
                    </Label>
                    <p className='text-sm'>{profile.bio || 'None'}</p>
                </div>
                <div className='flex justify-end'>
                    <Button
                        variant='default'
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit
                    </Button>
                </div>
            </div>
        </>
    );
}
