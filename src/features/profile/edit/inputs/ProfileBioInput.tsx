'use client';
import { Textarea } from '@/ui/textarea';
import { useEditProfileForm } from '../EditProfileForm';
import React from 'react';
import { FieldWithError } from '../ProfileEditFormContents';

export function ProfileBioInput({ className }: { className?: string }) {
    const { register, errors } = useEditProfileForm();
    return (
        <FieldWithError error={errors.bio} className={className}>
            <Textarea
                id='bio'
                rows={4}
                placeholder='Write a brief summary about yourself'
                {...register('bio')}
                aria-invalid={!!errors.bio}
            />
        </FieldWithError>
    );
}
