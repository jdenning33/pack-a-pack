import React from 'react';
import { Button } from '@/ui/button';
import { useEditGearForm } from '../EditGearForm';

export function GearSaveButton() {
    const { gear } = useEditGearForm();
    return (
        <Button
            type='submit'
            disabled={gear?.isPublic}
            disabledTitle='You cannot edit public gear directly, use "Save As New" instead.'
        >
            Save
        </Button>
    );
}
