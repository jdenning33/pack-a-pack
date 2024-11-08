'use client';
import { Input } from '@/ui/input';
import { useEditProfileForm } from '../EditProfileForm';
import React from 'react';
import { FieldWithError } from '../ProfileEditFormContents';

export function ProfileUsernameInput({ className }: { className?: string }) {
    const { register, errors } = useEditProfileForm();
    return (
        <FieldWithError error={errors.username} className={className}>
            <Input
                id='username'
                placeholder='John Doe'
                {...register('username')}
                aria-invalid={!!errors.username}
            />
        </FieldWithError>
    );
}
