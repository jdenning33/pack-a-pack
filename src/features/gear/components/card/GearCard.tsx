import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Badge } from '@/ui/badge';
import { useGearContext } from '../../useGearContext';
import { useFormatWeight } from '@/lib/utils';

export const GearCard: React.FC<{ className?: string }> = ({ className }) => {
    const { gear } = useGearContext();
    const formatWeight = useFormatWeight();
    if (!gear) return null;
    return (
        <Card className={className}>
            <CardContent className='p-3 flex flex-col h-full'>
                <div className='w-24 h-24 mb-2 relative flex self-center shrink-0'>
                    <ImageWithFallback
                        src={gear.image || ''}
                        fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        alt={gear.name}
                        fill={true}
                        sizes='100% 100%'
                        className='rounded object-contain object-top'
                    />
                </div>
                <div className='absolute top-2 right-2 flex flex-col items-end gap-1'>
                    <Badge variant='secondary' className='bg-opacity-60'>
                        {gear.brand}
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/90'
                    >
                        {formatWeight(gear.weight)}
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/90'
                    >
                        ${gear.price.toFixed(0)}
                    </Badge>
                </div>
                <div className='text-left flex-grow overflow-hidden'>
                    <h4 className='font-bold text-sm line-clamp-2'>
                        {gear.name}
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                        {gear.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
