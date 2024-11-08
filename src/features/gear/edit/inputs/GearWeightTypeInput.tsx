import React from 'react';
import { useEditGearForm } from '../EditGearForm';
import { GearFieldWithError } from '../StandardEditGearForm';
import { Controller } from 'react-hook-form';
import { EditWeightTypeToggle } from '@/features/shared/EditWeightTypeToggle';

export function GearWeightTypeInput({ className }: { className?: string }) {
    const { control, errors } = useEditGearForm();

    return (
        <GearFieldWithError className={className} error={errors.weightType}>
            <Controller
                name='weightType'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <EditWeightTypeToggle
                        weightType={value}
                        onChange={onChange}
                        activeButtonVariant='outline'
                        inactiveButtonVariant='secondary'
                        activeButtonClassName='hover:bg-background'
                    />
                )}
            />
        </GearFieldWithError>
    );
}
