'use client';

import { KitProvider } from '@/features/kit/KitProvider';
import { usePack } from '../usePack';
import { AddKitButton } from '@/features/kit/components/AddKitButton';
import { KitCard } from '@/features/kit/components/KitCard';
import { KitModal, KitModalTrigger } from '@/features/kit/components/KitModal';
import { KitQuickOptionsMenuButton } from '@/features/kit/components/KitQuickOptionsMenuButton';

export function PackContents() {
    const { pack, isReadOnly } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                {!isReadOnly && (
                    <KitProvider packId={pack.id} isReadOnly={isReadOnly}>
                        <AddKitButton />
                        <KitModal />
                    </KitProvider>
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
                    <KitProvider
                        key={kit.id}
                        packId={kit.packId}
                        isReadOnly={isReadOnly}
                        kit={kit}
                        className='break-inside-avoid'
                    >
                        <KitModalTrigger>
                            <KitCard />
                        </KitModalTrigger>
                        <KitModal />
                        <KitQuickOptionsMenuButton />
                    </KitProvider>
                ))}
            </div>
        </div>
    );
}
