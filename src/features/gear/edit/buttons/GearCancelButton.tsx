import React from 'react';
import { Button } from '@/ui/button';
import { useEditGearForm } from '../EditGearForm';

export function GearCancelButton() {
    const { onCancel } = useEditGearForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
