'use client';

import { KitProvider } from '@/features/kit/KitProvider';
import { usePack } from '../usePack';
import { KitCard } from '@/features/kit/components/card/KitCard';
import {
    KitModal,
    KitModalTrigger,
} from '@/features/kit/components/modal/KitModal';
import {
    DeleteKitOption,
    KitQuickOptionsMenuButton,
} from '@/features/kit/components/KitQuickOptionsMenuButton';
import { useState } from 'react';
import { Button } from '@/ui/button';
import {
    KitOpenEditModalOption,
    KitOpenModalOption,
} from '@/features/kit/components/modal/KitOpenModalOption';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { Plus } from 'lucide-react';

export function PackContents() {
    const { pack, isReadOnly } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-2xl font-bold'>{pack.name}</h1>
                <StandardAddKitButton />
            </div>
            {pack.kits.length === 0 && (
                <div className=''>
                    Looks like this pack is empty.
                    {!isReadOnly && ' Add a kit to get started!'}
                </div>
            )}
            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                {pack.kits.map((kit) => (
                    <KitProvider
                        key={kit.id}
                        packId={kit.packId}
                        isReadOnly={isReadOnly}
                        kit={kit}
                        className='h-full'
                        style={{
                            gridRow: `span ${kit.items.length + 3}`,
                        }}
                    >
                        <KitModal>
                            <KitModalTrigger className='h-full'>
                                <KitCard className='h-full'>
                                    <KitQuickOptionsMenuButton>
                                        <KitOpenModalOption />
                                        <KitOpenEditModalOption />
                                        <DropdownMenuSeparator />
                                        <DeleteKitOption />
                                    </KitQuickOptionsMenuButton>
                                </KitCard>
                            </KitModalTrigger>
                        </KitModal>
                    </KitProvider>
                ))}
            </div>
        </div>
    );
}

function StandardAddKitButton() {
    const { pack, isReadOnly } = usePack();
    const [editKitId, setEditKitId] = useState<string | null>(null);
    const editKit = pack.kits.find((kit) => kit.id === editKitId);

    return (
        <div>
            {editKitId && (
                <KitProvider
                    packId={pack.id}
                    isReadOnly={isReadOnly}
                    kit={editKit}
                    afterKitUpdated={(kit) => setEditKitId(kit.id)}
                >
                    <KitModal
                        isOpen={true}
                        onIsOpenChange={(open) => !open && setEditKitId(null)}
                    />
                </KitProvider>
            )}
            <Button
                onClick={() => setEditKitId('new')}
                variant='outline'
                size='sm'
                disabled={isReadOnly}
                disabledTitle='You cannot edit this pack'
            >
                <Plus className='mr-2 h-4 w-4' /> Add New Kit
            </Button>
        </div>
    );
}
