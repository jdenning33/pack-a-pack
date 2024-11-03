'use client';

// ProfileContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Textarea } from '@/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Pencil, Save, User, X } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useAuth } from '../auth/useAuth';
import { useAppMutations } from '../app-mutations/useAppMutations';

type ProfileFormData = {
    username: string;
    preferredWeightFormat: 'kg' | 'lbs' | 'lbs+oz';
    location: string;
    bio: string;
};

type ProfileContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function useProfileModal() {
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

// ProfileViewContent.tsx
function ProfileViewContent() {
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

// ProfileEditContent.tsx
function ProfileEditContent() {
    const { isEditing, setIsEditing } = useProfileModal();
    const { updateProfile } = useAppMutations();
    const { profile } = useAuth();

    const { register, handleSubmit, reset, setValue, watch } =
        useForm<ProfileFormData>({
            defaultValues: profile || {},
        });

    if (!profile) return null;

    const handleCancel = () => {
        setIsEditing(false);
        reset(profile || {});
    };

    const onSubmit = async (data: ProfileFormData) => {
        await updateProfile({ ...profile, ...data });
        setIsEditing(false);
    };

    if (!isEditing) return null;
    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 -mt-2'>
                <div className='space-y-2'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        id='username'
                        placeholder='John Doe'
                        {...register('username', { required: false })}
                    />
                </div>
                <div className='space-y-2'>
                    <Label>Weight Format Preference</Label>
                    <RadioGroup
                        value={watch('preferredWeightFormat')}
                        onValueChange={(value) =>
                            setValue(
                                'preferredWeightFormat',
                                value as 'kg' | 'lbs' | 'lbs+oz'
                            )
                        }
                        className='flex space-x-4'
                    >
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='kg' id='kg' />
                            <Label htmlFor='kg'>
                                Kilograms <br /> (1.4 kg)
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='lbs' id='lbs' />
                            <Label htmlFor='lbs'>
                                Pounds <br /> (2.6 lbs)
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='lbs+oz' id='lbs+oz' />
                            <Label htmlFor='lbs+oz'>
                                Pounds + Ounces <br /> (2 lbs, 6 oz)
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                        id='location'
                        placeholder='Enter your location'
                        {...register('location', { required: false })}
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='bio'>Summary</Label>
                    <Textarea
                        id='bio'
                        rows={4}
                        placeholder='Write a brief summary about yourself'
                        {...register('bio', { required: false })}
                    />
                </div>
                <div className='flex justify-end space-x-2'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={handleCancel}
                    >
                        <X className='h-4 w-4 mr-2' />
                        Cancel
                    </Button>
                    <Button type='submit'>
                        <Save className='h-4 w-4 mr-2' />
                        Save Changes
                    </Button>
                </div>
            </form>
        </>
    );
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
                        <ProfileEditContent />
                    ) : (
                        <ProfileViewContent />
                    )}
                </DialogContent>
            </Dialog>
        </ProfileContext.Provider>
    );
}
