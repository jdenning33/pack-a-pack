import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Badge } from '@/ui/badge';
import { useGearContext } from './GearContext';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Gear } from '@/lib/appTypes';

// GearDetailPanel component
export const GearCard: React.FC<{ className?: string }> = ({ className }) => {
    const { gear } = useGearContext();
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
                        className='rounded object-contain'
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
                        {gear.weight.toFixed(0)} oz
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

export function GearSelectBanner({
    onSelect,
}: {
    onSelect?: (gear: Gear) => void;
}) {
    const { gear } = useGearContext();
    if (!gear) return null;
    return (
        <div
            className={cn(
                'flex opacity-0 group-hover:opacity-100 z-10',
                'absolute inset-0 top-3/4 bg-primary/30 items-center justify-center rounded-b-xl transition-all'
            )}
        >
            <div className='bg-primary rounded-lg'>
                <Button
                    variant='secondary'
                    className='!bg-opacity-100'
                    onClick={() => onSelect?.(gear)}
                >
                    Select
                </Button>
            </div>
        </div>
    );
}
