import React from 'react';
import { Button } from '@/ui/button';
import { useEditGearForm } from '../EditGearForm';

export function GearSaveAsNewButton() {
    const { handleSubmit, onSubmitAsNew } = useEditGearForm();
    return (
        <Button
            type='button'
            variant={'outline'}
            onClick={handleSubmit(onSubmitAsNew)}
            title='This will create a new gear item with these details, leaving the original unchanged.'
        >
            Save As New
        </Button>
    );
}
