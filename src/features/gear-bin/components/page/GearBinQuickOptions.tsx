'use client';
import React from 'react';
import { ChevronDown, PlusIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { GearBinModalTrigger } from '@/features/gear-bin/components/modal/GearBinModalTrigger';
import { GearBinModal } from '@/features/gear-bin/components/modal/GearBinModal';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import {
    GearSearchModal,
    GearSearchModalTrigger,
} from '@/features/gear-search/modal/GearSearchModal';
import { GearProvider } from '@/features/gear/GearProvider';
import { GearModal } from '@/features/gear/components/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/components/modal/GearModalTrigger';

export function GearBinQuickOptions() {
    const { gearBin } = useGearBin();
    const { deleteUserGearBin, addGearToUser } = useAppMutations();
    if (!gearBin) return null;
    return (
        <GearBinModal>
            <GearSearchModal
                onGearSelected={(gear) => {
                    addGearToUser(gear.id, gearBin.id);
                }}
            >
                <div className='flex items-center group-data-[state=closed]:hidden'>
                    <GearSearchModalTrigger asChild>
                        <Button className='mr-2' variant='outline' size='sm'>
                            <PlusIcon className='h-3 w-3 mr-2' />
                            Find Gear
                        </Button>
                    </GearSearchModalTrigger>
                    <GearProvider
                        afterGearUpdated={(gear) => {
                            addGearToUser(gear.id, gearBin.id);
                        }}
                    >
                        <GearModal>
                            <GearModalTrigger defaultEditing={true}>
                                <Button
                                    className='mr-2'
                                    variant='outline'
                                    size='sm'
                                    allowPropagation={true}
                                >
                                    <PlusIcon className='h-3 w-3 mr-2' />
                                    New Gear
                                </Button>
                            </GearModalTrigger>
                        </GearModal>
                    </GearProvider>

                    <GearBinModalTrigger isEditing={true} asChild>
                        <Button
                            className='rounded-r-none hidden sm:block'
                            variant='outline'
                            size='sm'
                        >
                            Edit
                        </Button>
                    </GearBinModalTrigger>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size='sm'
                                variant='outline'
                                className='sm:rounded-l-none p-2'
                            >
                                <ChevronDown className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <GearBinModalTrigger isEditing={true} asChild>
                                <DropdownMenuItem>Edit Bin</DropdownMenuItem>
                            </GearBinModalTrigger>
                            <DropdownMenuItem
                                onClick={() => deleteUserGearBin(gearBin)}
                            >
                                Delete Bin
                            </DropdownMenuItem>
                            <DropdownMenuItem>Add Gear</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </GearSearchModal>
        </GearBinModal>
    );
}
