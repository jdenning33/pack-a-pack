'use client';
import { Input } from '@/ui/input';
import { useEditProfileForm } from '../EditProfileForm';
import React from 'react';
import { FieldWithError } from '../ProfileEditFormContents';

export function ProfileLocationInput({ className }: { className?: string }) {
    const { register, errors } = useEditProfileForm();
    return (
        <FieldWithError error={errors.location} className={className}>
            <Input
                id='location'
                placeholder='Enter your location'
                {...register('location')}
                aria-invalid={!!errors.location}
            />
        </FieldWithError>
    );
}
