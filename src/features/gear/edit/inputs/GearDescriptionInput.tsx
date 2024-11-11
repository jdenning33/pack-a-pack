import React from 'react';
import { Textarea } from '@/ui/textarea';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.description}>
            <Textarea
                id='description'
                placeholder='Description (optional)'
                {...register('description')}
            />
        </GearFieldWithError>
    );
}
