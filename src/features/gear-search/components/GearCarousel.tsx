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
import { GearProvider } from '../../gear/GearProvider';
import { AddGearButton } from '../../gear/components/AddGearButton';
import {
    GearCard,
    GearSelectBanner,
} from '../../gear/components/card/GearCard';
import { GearModal, GearModalTrigger } from '../../gear/components/GearModal';
import { useGearSearch } from '../useGearSearch';

export function GearCarousel({
    onSelected,
    variant = 'default',
    useModal = true,
}: {
    className?: string;
    variant?: 'default' | 'compact';
    useModal?: boolean;
    onSelected?: (gear: Gear) => void;
}) {
    const { gear } = useGearSearch();

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
                        'flex items-center h-52',
                        variant === 'compact'
                            ? ''
                            : 'bg-muted border-t border-b px-2'
                    )}
                >
                    <CarouselContent className='-ml-2'>
                        {gear.map((g) => (
                            <CarouselItem
                                key={g.id}
                                className='w-36 max-w-36 pl-2 '
                            >
                                <GearProvider
                                    gear={g}
                                    className=''
                                    useModal={useModal}
                                >
                                    <GearModalTrigger>
                                        <GearCard
                                            className={
                                                variant === 'compact'
                                                    ? 'h-52'
                                                    : 'h-[12.5rem] shadow-sm'
                                            }
                                        />
                                    </GearModalTrigger>
                                    <GearModal />
                                    {onSelected && (
                                        <GearSelectBanner
                                            onSelect={onSelected}
                                        />
                                    )}
                                </GearProvider>
                            </CarouselItem>
                        ))}
                        <CarouselItem className='basis-1/2 md:basis-1/3 pl-2 flex items-center '>
                            <GearProvider afterGearUpdated={onSelected}>
                                <AddGearButton
                                    className={cn(
                                        'bg-[unset] border-0 shadow-none',
                                        variant === 'compact' ? 'h-52' : 'h-48'
                                    )}
                                />
                                <GearModal />
                            </GearProvider>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className='h-52 rounded-l-lg rounded-r-[1px] -left-10' />
                    <CarouselNext className='h-52 rounded-r-lg rounded-l-[1px] -right-10' />
                </div>
            </Carousel>
        </div>
    );
}
