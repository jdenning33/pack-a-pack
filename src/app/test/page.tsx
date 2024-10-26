'use client';
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxItem,
} from '@/ui/combobox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import { InfoIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Button } from '@/ui/button';

export default function GearPage() {
    return (
        <main className='container flex flex-col gap-8 p-4 m-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>My Gear</h1>
                <div>
                    <Button variant='outline'>Add New Gear</Button>
                </div>
            </div>

            <Dialog modal={true}>
                <DialogTrigger asChild>
                    <button className='btn'>Add New Item</button>
                </DialogTrigger>

                <DialogContent>
                    <div className='flex items-center'>
                        Link gear to this item?
                        <Tooltip>
                            <TooltipTrigger>
                                <InfoIcon className='h-4 w-4 ml-1' />
                            </TooltipTrigger>
                            <TooltipContent side='bottom' className='max-w-48'>
                                <ul>
                                    <li>
                                        - An item is a thing you need to pack,
                                        i.e. &quot;Stove&quot;.
                                    </li>
                                    <li>
                                        - Gear is the actual product you own,
                                        i.e. &quot;MSR Pocket Rocket&quot;.
                                    </li>
                                </ul>
                                <br />
                                Items belong to a pack and are only used once.
                                Gear, however, can be used across multiple packs
                                so that you do not have to re-enter tedious
                                details like weight and price.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className='flex gap-1 -mx-1 mt-1'>
                        <Combobox
                            onWheel={(e) => e.stopPropagation()}
                            placeholder='Search My Gear'
                            className='w-fit'
                        >
                            <ComboboxInput />
                            <ComboboxList className='max-h-64'>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 37].map(
                                    (i) => (
                                        <ComboboxItem
                                            value={i + '-gear'}
                                            key={i}
                                            keywords={
                                                i === 37
                                                    ? ['test', 'a', 'sentence']
                                                    : ['bow', 'wow']
                                            }
                                        >
                                            <div className='flex gap-4 w-full'>
                                                <ImageWithFallback
                                                    src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                                                    alt='test'
                                                    className='rounded object-contain'
                                                    width={32}
                                                    height={48}
                                                />
                                                <div className='flex-1'>
                                                    <div className='font-bold mr-2 line-clamp-1'>
                                                        MSR Pocket Rocket Bocket
                                                    </div>
                                                    <div className='text-muted-foreground'>
                                                        Stove
                                                    </div>
                                                </div>
                                                <div className='flex flex-col justify-between shrink-0'>
                                                    <div>12.2 oz</div>
                                                    <div>$89</div>
                                                </div>
                                            </div>
                                        </ComboboxItem>
                                    )
                                )}
                            </ComboboxList>
                            <ComboboxItem value='new' forceMount={true}>
                                <PlusIcon className='h-4 w-4 mr-2' />
                                Add New Gear
                            </ComboboxItem>
                        </Combobox>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    );
}
