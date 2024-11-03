import React from 'react';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Badge } from '@/ui/badge';
import { useGearContext } from '../../useGearContext';
import { BadgeCheckIcon, EarthIcon } from 'lucide-react';
import { useFormatWeight } from '@/lib/utils';

export const GearDetailCardContent: React.FC = () => {
    const { gear } = useGearContext();
    const formatWeight = useFormatWeight();
    if (!gear) return null;

    return (
        <div className='w-full flex '>
            {/* gear image */}
            <div className='relative w-24 h-24 rounded overflow-hidden flex-shrink-0'>
                <ImageWithFallback
                    src={gear.image || ''}
                    fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt={gear.name || 'placeholder'}
                    fill={true}
                    sizes='100% 100%'
                    className='object-contain object-left-top rounded'
                />
            </div>
            <div className='ml-4 flex-grow flex flex-col'>
                <h3 className='font-bold leading-tight mb-2'>{gear.name}</h3>
                <div className='flex flex-wrap gap-2 mb-2 items-center'>
                    {gear.isPublic && (
                        <span title='Public Gear'>
                            <EarthIcon
                                className='h-4 w-4 -translate-y-[1px] opacity-80'
                                strokeWidth={1.5}
                            />
                        </span>
                    )}
                    {gear.isOwnedByUser && (
                        <span title='Your Gear'>
                            <BadgeCheckIcon
                                className='h-4 w-4 scale-105 -translate-y-[1px] opacity-80'
                                strokeWidth={1.5}
                            />
                        </span>
                    )}
                    <Badge variant='outline' className='bg-background'>
                        {gear.brand}
                    </Badge>
                    <Badge variant='outline'>{formatWeight(gear.weight)}</Badge>
                    <Badge variant='outline'>
                        $ {gear.price?.toFixed(0) || '_'}
                    </Badge>
                </div>
                <p className='text-sm text-muted-foreground line-clamp-2'>
                    {gear.description}
                </p>
            </div>
        </div>
    );
};
