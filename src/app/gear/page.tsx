'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/ui/button';
import { AddGearBinButton } from '@/features/gear-bin/components/AddGearBinButton';
import { UserGearBinSearchProvider } from '@/features/gear-bin-search/GearBinSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { GearBinList } from '@/features/gear-bin/components/page/GearBinList';
import { Accordion } from '@/ui/accordion';
import { UserGearBinProvider } from '@/features/gear-bin/GearBinProvider';
import { BinlessGearAccordionItem } from '@/features/gear-bin/components/page/BinlessGearAccordionItem';
import { GearBinAccordionItem } from '@/features/gear-bin/components/page/GearBinAccordionItem';
import { GearBinGearList } from '@/features/gear-bin/components/page/GearBinGearList';
import { GearProvider } from '@/features/gear/GearProvider';
import { AlternateGearCard } from '@/features/gear/components/card/AlternateGearCard';
import { Gear, UserGearBin } from '@/lib/appTypes';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    useDroppable,
    useDraggable,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { cn } from '@/lib/utils';
import { Input } from '@/ui/input';
import { GearModal } from '@/features/gear/components/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/components/modal/GearModalTrigger';

export default function UserGearPage() {
    const { user } = useAuth();
    const [activeGear, setActiveGear] = useState<Gear | null>(null);
    const { addGearToUser } = useAppMutations();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    if (!user)
        return (
            <div>
                <h1>You must be logged in to view this page</h1>
            </div>
        );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const draggedGear = active.data.current as Gear;
        setActiveGear(draggedGear);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.data.current) {
            const gearId = active.data.current.id;
            const newBinId = over.id as string;

            try {
                await addGearToUser(gearId, newBinId);
            } catch (error) {
                console.error('Failed to move gear:', error);
            }
        }

        setActiveGear(null);
    };

    return (
        <main className='container flex flex-col gap-4 sm:p-4 m-auto'>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <div className='flex justify-between items-center border rounded-md p-4 shadow -mx-2 mb-4'>
                    <h1 className='text-2xl font-bold'>My Gear</h1>
                    <div className='flex'>
                        {/* <Button
                            size='sm'
                            variant='outline'
                            className='px-2 rounded-r-none'
                        >
                            <Table className='h-4 w-4' />
                        </Button>
                        <Button
                            size='sm'
                            variant='outline'
                            className='px-2 rounded-l-none'
                        >
                            <LayoutGrid className='h-4 w-4' />
                        </Button> */}
                    </div>
                </div>

                <UserGearBinSearchProvider>
                    <div className='flex justify-between'>
                        <Input
                            className='flex-1 max-w-[20rem]'
                            placeholder='Search gear...'
                        />
                        <AddGearBinButton>
                            <Button
                                variant='outline'
                                size='sm'
                                className='flex items-center gap-2 mr-2'
                            >
                                <Plus size={14} />
                                New Gear Bin
                            </Button>
                        </AddGearBinButton>
                    </div>
                    <Accordion
                        type='multiple'
                        className='w-full space-y-6'
                        defaultValue={['binless']}
                    >
                        <BinlessGearAccordionItem>
                            <PageGearList />
                        </BinlessGearAccordionItem>
                        <GearBinList
                            className='flex flex-col gap-4'
                            binRenderer={(bin) => (
                                <DroppableGearBinAccordionItem
                                    key={bin.id}
                                    gearBin={bin}
                                />
                            )}
                        />
                    </Accordion>
                </UserGearBinSearchProvider>

                <DragOverlay>
                    {activeGear ? (
                        <div className='opacity-80'>
                            <AlternateGearCard gear={activeGear} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </main>
    );
}

function DroppableGearBinAccordionItem({ gearBin }: { gearBin: UserGearBin }) {
    const { setNodeRef } = useDroppable({
        id: gearBin.id,
    });

    return (
        <div ref={setNodeRef}>
            <UserGearBinProvider key={gearBin.id} gearBin={gearBin}>
                <GearBinAccordionItem>
                    <PageGearList />
                </GearBinAccordionItem>
            </UserGearBinProvider>
        </div>
    );
}

function PageGearList() {
    return (
        <GearBinGearList
            className='gap-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]'
            gearRenderer={(gear) => (
                <DraggableGearCard key={gear.id} gear={gear} />
            )}
        />
    );
}

function DraggableGearCard({ gear }: { gear: Gear }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: gear.id,
        data: gear,
    });

    return (
        <GearProvider gear={gear}>
            <GearModal>
                <GearModalTrigger
                    className={cn('h-full', isDragging && 'opacity-70')}
                >
                    <div
                        ref={setNodeRef}
                        className='h-full'
                        {...listeners}
                        {...attributes}
                    >
                        <AlternateGearCard gear={gear} />
                    </div>
                </GearModalTrigger>
            </GearModal>
        </GearProvider>
    );
}
