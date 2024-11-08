import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from './EditGearForm';

export function GearImageUrlInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={className}>
            <Input
                placeholder='Image URL (optional)'
                {...register('image', {
                    pattern: {
                        value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                        message: 'Invalid image URL',
                    },
                })}
                aria-invalid={!!errors.image}
            />
            {errors.image && (
                <p className='text-sm text-red-600'>{errors.image.message}</p>
            )}
        </div>
    );
}
