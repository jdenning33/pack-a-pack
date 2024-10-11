'use client';

import { usePack } from '../../hooks/usePack';
import { AddKitButton } from '../kit/AddKitButton';
import { KitCard } from '../kit/KitCard';
import { SelectedKitModal } from '../kit/SelectedKitModal';

export function PackContents() {
    const { pack } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                <AddKitButton />
            </div>

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
