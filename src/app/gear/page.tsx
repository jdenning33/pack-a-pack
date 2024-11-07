'use client';
import { useCallback, useContext } from 'react';
import { LayoutGrid, Table } from 'lucide-react';
import { Button } from '@/ui/button';
import { AddGearBinButton } from '@/features/gear-bin/components/AddGearBinButton';
import {
    UserGearBinSearchProvider,
    UserGearFilterBar,
} from '@/features/gear-bin-search/GearBinSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { Accordion } from '@/ui/accordion';
import { UserGearBinProvider } from '@/features/gear-bin/GearBinProvider';
import { AlternateGearCard } from '@/features/gear/components/card/AlternateGearCard';
import { DragOverlay } from '@dnd-kit/core';
import { useUserGearBins } from '@/features/gear-bin-search/useGearBinSearch';
import { GearDragProvider } from '../../features/gear-bin-search/gear-drag/GearDragProvider';
import { GearDragDropSlot } from '@/features/gear-bin-search/gear-drag/GearDragDropSlot';
import { GearDragContext } from '../../features/gear-bin-search/gear-drag/GearDragProvider';
import { GearBinDropSlot } from '@/features/gear-bin-search/gear-drag/GearBinDropSlot';
import { PageHeader } from '@/ui/page-header';
import { PageHeaderTitle } from '@/ui/page-header';
import { PageHeaderActions } from '@/ui/page-header';
import { GearBinAccordionItem } from '@/features/gear-bin/components/accordion/GearBinAccordionItem';
import { GearBinGearGrid } from '@/features/gear-bin/components/accordion/GearBinGearGrid';
import { ButtonGroup } from '@/ui/button-group';
import { Gear } from '@/lib/appTypes';
import { GearModal } from '@/features/gear/components/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/components/modal/GearModalTrigger';
import { cn } from '@/lib/utils';
import { useGearContext } from '@/features/gear/useGearContext';
import { BinlessGearBinProvider } from '@/features/gear-bin/BinlessGearBinProvider';

export default function UserGearPage() {
    const { user } = useAuth();

    if (!user)
        return (
            <div>
                <h1>You must be logged in to view this page</h1>
            </div>
        );

    return (
        <main className='container flex flex-col gap-4 sm:p-4 m-auto'>
            <PageHeader>
                <PageHeaderTitle>Your Gear</PageHeaderTitle>
                <PageHeaderActions>
                    <LayoutToggleButtons />
                </PageHeaderActions>
            </PageHeader>

            <UserGearBinSearchProvider>
                <div className='flex justify-between items-center'>
                    <UserGearFilterBar
                        placeholder='Filter...'
                        className='max-w-sm'
                    />
                    <AddGearBinButton variant='outline' size='sm' />
                </div>

                <GearDragProvider>
                    <GearDragOverlay />
                    <GearBinsContent />
                </GearDragProvider>
            </UserGearBinSearchProvider>
        </main>
    );
}

function LayoutToggleButtons() {
    return (
        <ButtonGroup>
            <Button size='sm' variant='outline' className='px-2'>
                <Table className='h-4 w-4' />
            </Button>
            <Button size='sm' variant='outline' className='px-2'>
                <LayoutGrid className='h-4 w-4' />
            </Button>
        </ButtonGroup>
    );
}

function GearDragOverlay() {
    const { activeGear } = useContext(GearDragContext);
    return (
        <DragOverlay>
            {activeGear ? (
                <AlternateGearCard gear={activeGear} className='opacity-90' />
            ) : null}
        </DragOverlay>
    );
}

function GearBinsContent() {
    const { gearBins, isLoading } = useUserGearBins();
    const { activeGear } = useContext(GearDragContext);
    const filterActiveGear = useCallback(
        (g: Gear) => g.id !== activeGear?.id,
        [activeGear]
    );
    if (isLoading) return null;
    return (
        <Accordion
            type='multiple'
            className='w-full space-y-6'
            defaultValue={['binless', ...gearBins.map((bin) => bin.id)]}
        >
            {/* Binless gear bin */}
            <BinlessGearBinProvider>
                <GearBinDropSlot>
                    <GearBinAccordionItem variant='binless'>
                        <GearBinGearGrid filter={filterActiveGear}>
                            <DraggableGearCard />
                        </GearBinGearGrid>
                    </GearBinAccordionItem>
                </GearBinDropSlot>
            </BinlessGearBinProvider>

            {/* Gear bin accordion items */}
            {gearBins.map((bin) => (
                <UserGearBinProvider key={bin.id} gearBin={bin}>
                    <GearBinDropSlot>
                        <GearBinAccordionItem>
                            <GearBinGearGrid filter={filterActiveGear}>
                                <DraggableGearCard />
                            </GearBinGearGrid>
                        </GearBinAccordionItem>
                    </GearBinDropSlot>
                </UserGearBinProvider>
            ))}
        </Accordion>
    );
}

function DraggableGearCard() {
    const { gear } = useGearContext();
    if (!gear) return null;
    return (
        <GearModal>
            <GearModalTrigger className={cn('h-full')}>
                <GearDragDropSlot
                    key={gear.id}
                    className={cn('h-full rounded')}
                    isOverClassName='ring'
                    isDraggingClassName='opacity-40'
                >
                    <AlternateGearCard gear={gear} />
                </GearDragDropSlot>
            </GearModalTrigger>
        </GearModal>
    );
}
