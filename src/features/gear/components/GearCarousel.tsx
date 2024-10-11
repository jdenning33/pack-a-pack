import React from 'react';
import { GearCard } from './GearCard';
import { AddGearButton } from './AddGearButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/ui/carousel';
import { useGear } from '../useGear';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';

export function GearCarousel({
    onSelected,
    variant = 'default',
}: {
    className?: string;
    variant?: 'default' | 'compact';
    onSelected?: (gear: Gear) => void;
}) {
    const { gear } = useGear();

    return (
        <div className='relative mx-10'>
            <Carousel
                className='background-red-500'
                opts={{
                    loop: false,
                }}
            >
                <div
                    className={cn(
                        ' h-52 flex items-center',
                        variant === 'compact'
                            ? ''
                            : 'bg-muted border-t border-b px-2'
                    )}
                >
                    <CarouselContent className='-ml-2 '>
                        {gear.map((gear) => (
                            <CarouselItem
                                key={gear.id}
                                className='w-36 max-w-36 pl-2 '
                            >
                                <GearCard
                                    key={gear.id}
                                    className={
                                        variant === 'compact'
                                            ? 'h-52'
                                            : 'h-[12.5rem]'
                                    }
                                    gear={gear}
                                    onSelect={onSelected}
                                />
                            </CarouselItem>
                        ))}
                        <CarouselItem className='basis-1/2 md:basis-1/3 pl-2 flex items-center '>
                            <AddGearButton
                                className={cn(
                                    'bg-[unset] border-0 shadow-none h-48',
                                    variant === 'compact' ? 'h-52' : 'h-48'
                                )}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className='h-52 rounded-l-lg rounded-r-[1px] -left-10' />
                    <CarouselNext className='h-52 rounded-r-lg rounded-l-[1px] -right-10' />
                </div>
            </Carousel>
        </div>
    );
}
