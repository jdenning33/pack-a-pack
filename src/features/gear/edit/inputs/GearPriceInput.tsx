import React from 'react';
import { Input } from '@/ui/input';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';

export function GearPriceInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <GearFieldWithError className={className} error={errors.price}>
            <div className='flex items-center gap-1 relative'>
                <span className='absolute top-0 bottom-0 flex items-center left-3 text-sm'>
                    $
                </span>
                <Input
                    id='price'
                    type='number'
                    step={0.01}
                    className='pl-6'
                    placeholder='Price'
                    {...register('price', {
                        required: 'Price is required',
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: 'Price must be a positive number',
                        },
                    })}
                />
            </div>
        </GearFieldWithError>
    );
}
