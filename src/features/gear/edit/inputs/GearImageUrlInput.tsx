import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearImageUrlInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.image}>
            <Input
                id='image'
                placeholder='Image URL (optional)'
                {...register('image', {
                    pattern: {
                        value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                        message: 'Invalid image URL',
                    },
                })}
            />
        </GearFieldWithError>
    );
}
