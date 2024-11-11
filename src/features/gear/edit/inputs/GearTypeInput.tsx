import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearTypeInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.type}>
            <Input
                id='type'
                placeholder='Gear Type'
                {...register('type', {
                    required: 'Gear type is required',
                })}
            />
        </GearFieldWithError>
    );
}
