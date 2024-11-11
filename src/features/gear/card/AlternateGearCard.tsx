'use client';
import React, { forwardRef } from 'react';
import { Card, CardContent } from '@/ui/card';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { useFormatWeight } from '@/lib/utils';
import { useGearContext } from '../useGearContext';
import { Gear } from '@/lib/appTypes';

interface AlternateGearCardProps {
    onSelected?: (gear: Gear) => void;
    className?: string;
}

export const AlternateGearCard = forwardRef<
    HTMLDivElement,
    AlternateGearCardProps
>(({ onSelected, className = '' }, ref) => {
    const formatWeight = useFormatWeight();
    const { gear } = useGearContext();
    if (!gear) return null;
    return (
        <Card
            ref={ref}
            key={gear.id}
            className={`max-w-48 h-full rounded group relative ${className}`}
        >
            {onSelected && (
                <div className='rounded z-20 opacity-0 group-hover:opacity-100 transition-all flex absolute inset-0 bg-muted/50 items-center justify-center cursor-pointer'>
                    <Button onClick={(_) => onSelected(gear)}>
                        Add To My Gear
                    </Button>
                </div>
            )}
            <CardContent className='relative p-0'>
                <div className='relative w-full aspect-[4/3] p-1'>
                    <ImageWithFallback
                        src={gear.image}
                        alt={gear.name}
                        fill={true}
                        sizes='100% 100%'
                        className='rounded-t object-contain object-center'
                    />
                </div>
                <div className='flex flex-col absolute top-0 right-0 items-end [&>div:not(:first-child)]:rounded-r-none'>
                    <Badge
                        variant='default'
                        className='rounded-br-none rounded-tr'
                        title={`Type: ${gear.type}`}
                    >
                        {gear.type}&nbsp;
                    </Badge>
                    <Badge
                        variant='outline'
                        className='bg-background/95'
                        title={`Weight: ${formatWeight(gear.weight)}`}
                    >
                        {formatWeight(gear.weight)}
                    </Badge>
                    <Badge
                        variant='outline'
                        className='bg-background/95'
                        title={`Price: $${gear.price}`}
                    >
                        ${gear.price.toFixed(0)}
                    </Badge>
                </div>
                <div className='m-3 line-clamp-4'>
                    <h3 className='font-semibold text-sm'>{gear.name}</h3>
                    <p className='text-xs text-muted-foreground'>
                        {gear.brand}
                    </p>
                    <p className='text-xs'>{gear.description}</p>
                </div>
            </CardContent>
        </Card>
    );
});

// Add display name for better debugging
AlternateGearCard.displayName = 'AlternateGearCard';
