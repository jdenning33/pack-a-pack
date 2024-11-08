import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { toast } from 'sonner';
import { createIq7FormContext, Iq7Form } from '@/ui/iq7-form';

export type ProfileFormData = {
    username: string;
    preferredWeightFormat: 'kg' | 'lbs' | 'lbs+oz';
    location: string;
    bio: string;
};

export const [ProfileFormContext, useEditProfileForm] =
    createIq7FormContext<ProfileFormData>();

export function EditProfileForm({
    onFinished,
    children,
    className,
}: {
    onFinished?: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { profile, user } = useAuth();
    const { updateProfile } = useAppMutations();

    const handleSubmit = async (data: ProfileFormData) => {
        if (!user) {
            toast.error('You must be logged in to update your profile');
            return;
        }

        if (profile) {
            await updateProfile({ ...profile, ...data });
        }
    };

    return (
        <Iq7Form
            context={ProfileFormContext}
            defaultValues={profile}
            onSubmit={handleSubmit}
            onFinished={onFinished}
            className={className}
        >
            {children}
        </Iq7Form>
    );
}
