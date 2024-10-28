'use client';
import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Button } from '@/ui/button';
import { Gear } from '@/lib/appTypes';
import { Badge } from '@/ui/badge';
import { formatWeight } from '@/features/gear-bin/components/page/GearBinAccordionItem';

export const AlternateGearCard = ({
    gear,
    onSelected,
}: {
    gear: Gear;
    onSelected?: () => void;
}) => {
    return (
        <Card key={gear.id} className='max-w-48 h-full relative'>
            {onSelected && (
                <div className='rounded z-10 opacity-0 group-hover:opacity-100 transition-all flex absolute inset-0 bg-muted/50 items-center justify-center cursor-pointer'>
                    <Button onClick={onSelected}>Add To My Gear</Button>
                </div>
            )}
            <CardContent className='relative p-0'>
                <div className='relative w-full aspect-[4/3] p-1'>
                    <ImageWithFallback
                        src={gear.image}
                        alt={gear.name}
                        fill={true}
                        sizes='100% 100%'
                        className='rounded-t object-cover'
                    />
                </div>
                <div className='flex flex-col absolute top-0 right-0 items-end [&>div:not(:first-child)]:rounded-r-none'>
                    <Badge variant='default' className='rounded-br-none'>
                        {gear.brand}
                    </Badge>
                    <Badge variant='outline' className='bg-background/95'>
                        {formatWeight(gear.weight)}
                    </Badge>
                    <Badge variant='outline' className='bg-background/95'>
                        ${gear.price}
                    </Badge>
                </div>
                <div className='m-3 line-clamp-4'>
                    <h3 className='font-semibold text-sm'>{gear.name}</h3>
                    <p className='text-xs text-muted-foreground'>
                        {gear.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
