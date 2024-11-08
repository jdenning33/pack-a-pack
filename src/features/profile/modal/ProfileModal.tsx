'use client';

// ProfileContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import { useAuth } from '../../auth/useAuth';
import { ProfileModalViewContents } from './ProfileModalViewContents';
import { ProfileModalEditContents } from './ProfileModalEditContents';

type ProfileContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfileModal() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}

// ProfileModalTrigger.tsx
type ProfileModalTriggerProps = {
    asChild?: boolean;
    children: React.ReactNode;
};

export function ProfileModalTrigger({
    asChild,
    children,
}: ProfileModalTriggerProps) {
    return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
}

// ProfileModal.tsx
type ProfileModalProps = {
    children: React.ReactNode;
};

export function ProfileModal({ children }: ProfileModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { profile } = useAuth();

    useEffect(() => {
        if (!isOpen) setIsEditing(false);
    }, [isOpen]);

    if (!profile) return null;

    return (
        <ProfileContext.Provider
            value={{
                isOpen,
                setIsOpen,
                isEditing,
                setIsEditing,
            }}
        >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent className='sm:max-w-[550px]'>
                    {isEditing ? (
                        <ProfileModalEditContents />
                    ) : (
                        <ProfileModalViewContents />
                    )}
                </DialogContent>
            </Dialog>
        </ProfileContext.Provider>
    );
}
