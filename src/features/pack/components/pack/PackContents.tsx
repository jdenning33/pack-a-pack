'use client';

import { usePack } from '../../hooks/usePack';
import { AddKitButton } from '../kit/AddKitButton';
import { KitCard } from '../kit/KitCard';
import { SelectedKitModal } from '../kit/SelectedKitModal';

export function PackContents() {
    const { pack, isReadOnly } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                {!isReadOnly && <AddKitButton />}
            </div>

            {pack.kits.length === 0 && (
                <div className=''>
                    Looks like this pack is empty.
                    {!isReadOnly && ' Add a kit to get started!'}
                </div>
            )}

            <div className='columns-[10rem] gap-4 space-y-4'>
                {pack.kits.map((kit) => (
                    <KitCard
                        key={kit.id}
                        kit={kit}
                        className='break-inside-avoid'
                    />
                ))}
            </div>

            <SelectedKitModal />
        </div>
    );
}
