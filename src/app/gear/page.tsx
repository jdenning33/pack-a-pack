'use client';
import { useCallback, useContext } from 'react';
import { LayoutGrid, Table } from 'lucide-react';
import { Button } from '@/ui/button';
import {
    UserGearBinSearchProvider,
    UserGearFilterBar,
} from '@/features/gear-bin/search/GearBinSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { Accordion } from '@/ui/accordion';
import { GearBinProvider } from '@/features/gear-bin/GearBinProvider';
import { AlternateGearCard } from '@/features/gear/card/AlternateGearCard';
import { DragOverlay } from '@dnd-kit/core';
import { useUserGearBins } from '@/features/gear-bin/search/useGearBinSearch';
import { GearBinGearDragProvider } from '../../features/gear-bin/drag-n-drop/GearBinGearDragProvider';
import { GearDragContext } from '../../features/gear-bin/drag-n-drop/GearBinGearDragProvider';
import { GearBinGearDropSlot } from '@/features/gear-bin/drag-n-drop/GearBinGearDropSlot';
import { PageHeader } from '@/ui/page-header';
import { PageHeaderTitle } from '@/ui/page-header';
import { PageHeaderActions } from '@/ui/page-header';
import { GearBinAccordionItem } from '@/features/gear-bin/accordion/GearBinAccordionItem';
import { GearBinGearGrid } from '@/features/gear-bin/accordion/GearBinGearGrid';
import { ButtonGroup } from '@/ui/button-group';
import { Gear } from '@/lib/appTypes';
import { GearModal } from '@/features/gear/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/modal/GearModalTrigger';
import { cn } from '@/lib/utils';
import { BinlessGearBinProvider } from '@/features/gear-bin/BinlessGearBinProvider';
import { AddGearBinButton } from '@/features/gear-bin/new/AddGearBinButton';
import { GearDragDropSlot } from '@/features/gear-bin/drag-n-drop/GearBinDraggableGear';
import { GearProvider } from '@/features/gear/GearProvider';

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

                <GearBinGearDragProvider>
                    <GearDragOverlay />
                    <GearBinsContent />
                </GearBinGearDragProvider>
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
                <GearProvider gear={activeGear}>
                    <AlternateGearCard className='opacity-90' />
                </GearProvider>
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
            defaultValue={['binlessgear', ...gearBins.map((bin) => bin.id)]}
        >
            {/* Binless gear bin */}
            <BinlessGearBinProvider>
                <GearBinGearDropSlot>
                    <GearBinAccordionItem variant='binless'>
                        <GearBinGearGrid filter={filterActiveGear}>
                            <DraggableGearCard />
                        </GearBinGearGrid>
                    </GearBinAccordionItem>
                </GearBinGearDropSlot>
            </BinlessGearBinProvider>

            {/* Gear bin accordion items */}
            {gearBins
                .sort((a, b) => a.order - b.order)
                .map((bin) => (
                    <GearBinProvider key={bin.id} gearBin={bin}>
                        <GearBinGearDropSlot isOverClassName='ring'>
                            <GearBinAccordionItem>
                                <GearBinGearGrid filter={filterActiveGear}>
                                    <DraggableGearCard />
                                </GearBinGearGrid>
                            </GearBinAccordionItem>
                        </GearBinGearDropSlot>
                    </GearBinProvider>
                ))}
        </Accordion>
    );
}

function DraggableGearCard() {
    return (
        <GearModal>
            <GearModalTrigger className={cn('h-full')}>
                <GearDragDropSlot
                    className={cn('h-full rounded')}
                    isOverClassName='ring'
                    isDraggingClassName='opacity-40'
                >
                    <AlternateGearCard />
                </GearDragDropSlot>
            </GearModalTrigger>
        </GearModal>
    );
}
