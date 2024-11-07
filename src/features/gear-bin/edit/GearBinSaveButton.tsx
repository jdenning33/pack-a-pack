import React from 'react';
import { Button } from '@/ui/button';
import { useEditGearBinForm } from './EditGearBinForm';

export function GearBinSaveButton() {
    const { gearBin } = useEditGearBinForm();
    return (
        <Button type='submit'>
            {gearBin?.id ? 'Save' : 'Create'} Gear Bin
        </Button>
    );
}
