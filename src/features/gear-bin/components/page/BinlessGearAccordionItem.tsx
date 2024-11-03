'use client';
import React from 'react';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/ui/accordion';
import { useUserGearBins } from '@/features/gear-bin-search/useGearBinSearch';
import { UserGearBinProvider } from '@/features/gear-bin/GearBinProvider';
import { cn } from '@/lib/utils';

export function BinlessGearAccordionItem({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const { binlessGear } = useUserGearBins();

    if (!binlessGear.length) return null;
    return (
        <AccordionItem
            disabled={true}
            value='binless'
            className={cn(
                'rounded-lg [&[data-state=closed]>div]:rounded-b-md group data-[state=open]:!border-b-0',
                className
            )}
        >
            <AccordionTrigger className='px-4 py-2 hover:underline rounded-t-lg w-48 flex-none [&>svg]:opacity-20'>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-lg'>Binless Gear</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className='xbg-muted xborder rounded-md p-2'>
                <UserGearBinProvider
                    key='binlessgear'
                    gearBin={{
                        id: 'binlessgear',
                        name: 'Binless Gear',
                        order: 0,
                        description:
                            'Gear that has not been assigned to a gear bin',
                        userId: '',
                        isDeleted: false,
                        gear: binlessGear,
                    }}
                >
                    {children}
                </UserGearBinProvider>
            </AccordionContent>
        </AccordionItem>
    );
}
