'use client';
import { Button } from '@/ui/button';
import { Save } from 'lucide-react';
import React from 'react';

export function EditProfileSaveButton() {
    return (
        <Button type='submit'>
            <Save className='h-4 w-4 mr-2' />
            Save Changes
        </Button>
    );
}
