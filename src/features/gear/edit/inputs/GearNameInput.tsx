import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.name}>
            <Input
                id='name'
                placeholder='Gear Name'
                {...register('name', {
                    required: 'Gear name is required',
                })}
            />
        </GearFieldWithError>
    );
}
