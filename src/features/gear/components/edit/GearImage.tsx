import React from 'react';
import { useWatch } from 'react-hook-form';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useEditGearForm } from './EditGearForm';

export function GearImage() {
    const { control, gear } = useEditGearForm();
    const gearImage = useWatch({
        control: control,
        name: 'image',
    });

    return (
        <div className='relative w-24 h-24 rounded-lg flex-shrink-0'>
            <ImageWithFallback
                src={gearImage || ''}
                fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                alt={gear?.name || 'placeholder'}
                fill={true}
                sizes='100% 100%'
                className='rounded w-full h-full object-contain'
            />
        </div>
    );
}
