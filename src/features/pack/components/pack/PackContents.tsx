'use client';

import { KitDetails } from '@/features/kit/KitDetails';
import { usePack } from '../../hooks/usePack';
import { AddKitButton } from '@/features/kit/components/details/AddKitButton';
import { KitCard } from '@/features/kit/components/details/KitCard';
import {
    KitModal,
    KitModalTrigger,
} from '@/features/kit/components/details/KitModal';
import { KitQuickOptionsMenuButton } from '@/features/kit/components/details/KitQuickOptionsMenuButton';

export function PackContents() {
    const { pack, isReadOnly } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                {!isReadOnly && (
                    <KitDetails>
                        <AddKitButton />
                        <KitModal />
                    </KitDetails>
                )}
            </div>

            {pack.kits.length === 0 && (
                <div className=''>
                    Looks like this pack is empty.
                    {!isReadOnly && ' Add a kit to get started!'}
                </div>
            )}

            <div className='columns-[10rem] gap-4 space-y-4'>
                {pack.kits.map((kit) => (
                    <KitDetails
                        key={kit.id}
                        kit={kit}
                        className='break-inside-avoid'
                    >
                        <KitModalTrigger>
                            <KitCard />
                        </KitModalTrigger>
                        <KitModal />
                        <KitQuickOptionsMenuButton />
                    </KitDetails>
                ))}
            </div>
        </div>
    );
}
