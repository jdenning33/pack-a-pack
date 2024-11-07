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
import { GearBinModalTrigger } from '@/features/gear-bin/modal/GearBinModalTrigger';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import {
    GearSearchModal,
    GearSearchModalTrigger,
} from '@/features/gear-search/modal/GearSearchModal';
import { GearProvider } from '@/features/gear/GearProvider';
import { GearModal } from '@/features/gear/components/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/components/modal/GearModalTrigger';
import { StandardGearBinModal } from '../modal/StandardGearBinModal';
import { ButtonGroup } from '@/ui/button-group';

export function GearBinQuickOptions() {
    return (
        <StandardGearBinModal>
            <div className='flex items-center group-data-[state=closed]:hidden'>
                <OpenGearSearchModalButton />
                <AddGearButton />

                <ButtonGroup>
                    <OpenEditGearBinModalButton />
                    <GearBinDropDownMenu />
                </ButtonGroup>
            </div>
        </StandardGearBinModal>
    );
}

function OpenEditGearBinModalButton() {
    return (
        <GearBinModalTrigger isEditing={true} asChild>
            <Button className='hidden sm:block' variant='outline' size='sm'>
                Edit
            </Button>
        </GearBinModalTrigger>
    );
}

function OpenGearSearchModalButton() {
    const { gearBin } = useGearBin();
    const { addGearToUser } = useAppMutations();
    return (
        <GearSearchModal
            onGearSelected={(gear) => {
                addGearToUser(gear.id, gearBin.id);
            }}
        >
            <GearSearchModalTrigger asChild>
                <Button className='mr-2' variant='outline' size='sm'>
                    <PlusIcon className='h-3 w-3 mr-2' />
                    Find Gear
                </Button>
            </GearSearchModalTrigger>
        </GearSearchModal>
    );
}

function GearBinDropDownMenu() {
    const { gearBin } = useGearBin();
    const { deleteUserGearBin } = useAppMutations();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant='outline' className='p-2'>
                    <ChevronDown className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <GearBinModalTrigger isEditing={true} asChild>
                    <DropdownMenuItem>Edit Bin</DropdownMenuItem>
                </GearBinModalTrigger>
                <DropdownMenuItem onClick={() => deleteUserGearBin(gearBin)}>
                    Delete Bin
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AddGearButton() {
    const { gearBin } = useGearBin();
    const { addGearToUser } = useAppMutations();
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <GearProvider
            afterGearUpdated={(gear) => {
                const lastOrder = Math.max(...gearBin.gear.map((g) => g.order));
                addGearToUser(
                    gear.id,
                    gearBin.id,
                    lastOrder ? lastOrder + 1 : null
                );
                setIsOpen(false);
            }}
        >
            <GearModal isOpen={isOpen} onIsOpenChange={setIsOpen}>
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
    );
}
