import React from 'react';
import { Controller } from 'react-hook-form';
import { EditAttributesList } from '@/features/attributes/EditAttributesList';
import { useEditGearForm } from '../EditGearForm';

export function GearAttributesInput({ className }: { className?: string }) {
    const { control } = useEditGearForm();
    return (
        <Controller
            control={control}
            name='attributes'
            render={({ field: { onChange, value } }) => (
                <EditAttributesList
                    className={className}
                    initialAttributes={value}
                    onChange={onChange}
                />
            )}
        />
    );
}
