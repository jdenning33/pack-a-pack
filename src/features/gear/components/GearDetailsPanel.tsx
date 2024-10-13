import React from 'react';
import { Badge } from '@/ui/badge';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Gear } from '@/lib/appTypes';
import { Optional } from '@/lib/utils';

export function GearDetailsPanel({
    gear,
}: {
    gear: Optional<Gear, 'id'>;
}): React.ReactNode {
    return (
        <div className='w-full max-w-md flex '>
            {/* gear image */}
            <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                <ImageWithFallback
                    src={gear.image || ''}
                    fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt={gear.name || 'placeholder'}
                    fill={true}
                    sizes='100% 100%'
                    className='rounded object-contain'
                />
            </div>
            <div className='ml-4 flex-grow flex flex-col'>
                <h3 className='font-bold text-lg leading-tight mb-2'>
                    {gear.name}
                </h3>
                <div className='flex flex-wrap gap-2 mb-2'>
                    <Badge variant='outline' className='bg-background'>
                        {gear.brand}
                    </Badge>
                    <Badge variant='outline'>
                        {gear.weight?.toFixed(0) || '_'} oz
                    </Badge>
                    <Badge variant='outline'>
                        $ {gear.price?.toFixed(0) || '_'}
                    </Badge>
                </div>
                <p className='text-sm text-muted-foreground line-clamp-4'>
                    {gear.description}
                </p>
            </div>
        </div>
    );
}
