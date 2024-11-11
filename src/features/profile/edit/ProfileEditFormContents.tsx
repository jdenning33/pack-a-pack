'use client';
import { Label } from '@/ui/label';
import React from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';
import { ProfileUsernameInput } from './inputs/ProfileUsernameInput';
import { ProfileLocationInput } from './inputs/ProfileLocationInput';
import { ProfileBioInput } from './inputs/ProfileBioInput';
import { ProfileWeightFormatInput } from './inputs/ProfileWeightFormatInput';
import { EditProfileCancelButton } from './buttons/EditProfileCancelButton';
import { EditProfileSaveButton } from './buttons/EditProfileSaveButton';

export function ProfileEditFormContents() {
    return (
        <div className='space-y-4'>
            <LabelAndField label='Username' htmlFor='username'>
                <ProfileUsernameInput />
            </LabelAndField>

            <LabelAndField label='Weight' htmlFor='weight-format'>
                <ProfileWeightFormatInput />
            </LabelAndField>

            <LabelAndField label='Location' htmlFor='location'>
                <ProfileLocationInput />
            </LabelAndField>

            <LabelAndField label='Bio' htmlFor='bio'>
                <ProfileBioInput />
            </LabelAndField>

            <div className='flex justify-end space-x-2 mt-6'>
                <EditProfileCancelButton />
                <EditProfileSaveButton />
            </div>
        </div>
    );
}

export function LabelAndField({
    label,
    tooltip,
    children,
    htmlFor,
    className,
}: {
    label: React.ReactNode;
    tooltip?: React.ReactNode;
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}) {
    return (
        <div className={cn('flex items-start', className)}>
            <Label
                htmlFor={htmlFor}
                className='w-20 text-right p-2 flex items-center justify-end'
            >
                {label} {tooltip}
            </Label>
            {children}
        </div>
    );
}

export function FieldWithError({
    children,
    error,
    className,
}: {
    children: React.ReactNode;
    error?: FieldError;
    className?: string;
}) {
    return (
        <div className={cn('space-y-2', className)}>
            {children}
            {error && <p className='text-sm text-red-600'>{error.message}</p>}
        </div>
    );
}
