import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/ui/carousel';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { GearDetails } from './details/GearContext';
import { AddGearButton } from './details/AddGearButton';
import { GearCard, GearSelectBanner } from './details/GearCard';
import { useGear } from '../useGear';
import { GearModal } from './details/GearModal';

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
                        'flex items-center',
                        variant === 'compact'
                            ? ''
                            : 'bg-muted border-t border-b px-2'
                    )}
                >
                    <CarouselContent className='-ml-2 '>
                        {gear.map((g) => (
                            <CarouselItem
                                key={g.id}
                                className='w-36 max-w-36 pl-2 '
                            >
                                <GearDetails gear={g} className=''>
                                    <GearCard
                                        className={
                                            variant === 'compact'
                                                ? 'h-52 shadow-sm'
                                                : 'h-[12.5rem] shadow-sm'
                                        }
                                    />
                                    <GearSelectBanner onSelect={onSelected} />
                                </GearDetails>
                            </CarouselItem>
                        ))}
                        <CarouselItem className='basis-1/2 md:basis-1/3 pl-2 flex items-center '>
                            <GearDetails afterGearUpdated={onSelected}>
                                <AddGearButton
                                    className={cn(
                                        'bg-[unset] border-0 shadow-none h-48',
                                        variant === 'compact' ? 'h-52' : 'h-48'
                                    )}
                                />
                                <GearModal />
                            </GearDetails>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className='h-52 rounded-l-lg rounded-r-[1px] -left-10' />
                    <CarouselNext className='h-52 rounded-r-lg rounded-l-[1px] -right-10' />
                </div>
            </Carousel>
        </div>
    );
}