'use client';
import { Button } from '@/ui/button';
import { X } from 'lucide-react';
import { useEditProfileForm } from '../EditProfileForm';
import React from 'react';

export function EditProfileCancelButton() {
    const { onCancel } = useEditProfileForm();
    return (
        <Button type='button' variant='outline' onClick={onCancel}>
            <X className='h-4 w-4 mr-2' />
            Cancel
        </Button>
    );
}
