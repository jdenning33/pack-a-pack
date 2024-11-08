import React from 'react';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';
import { Controller } from 'react-hook-form';
import { EditWeightPopover } from '@/features/shared/EditWeightPopover';

export function GearWeightInput({ className }: { className?: string }) {
    const { control, errors } = useEditGearForm();

    return (
        <GearFieldWithError className={className} error={errors.weight}>
            <Controller
                name='weight'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className='min-w-20'>
                        <EditWeightPopover
                            id='weight'
                            grams={value}
                            onChange={onChange}
                        />
                    </div>
                )}
            />
        </GearFieldWithError>
    );
}
