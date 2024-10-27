import React from 'react';
import { Button } from '@/ui/button';
import { useEditGearBinForm } from './EditGearBinForm';

export function GearBinCancelButton() {
    const { onCancel } = useEditGearBinForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
