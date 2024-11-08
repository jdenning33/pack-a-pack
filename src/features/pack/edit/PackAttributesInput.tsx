import React from 'react';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useEditPackForm } from './EditPackForm';
import { EditAttributesList } from '@/features/attributes/EditAttributesList';

export function PackAttributesInput({ className }: { className?: string }) {
    const { control } = useEditPackForm();
    return (
        <div className={cn('flex items-center space-x-2', className)}>
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
        </div>
    );
}
