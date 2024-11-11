import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearBrandInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.brand}>
            <Input
                id='brand'
                placeholder='Brand (optional)'
                {...register('brand')}
            />
        </GearFieldWithError>
    );
}
