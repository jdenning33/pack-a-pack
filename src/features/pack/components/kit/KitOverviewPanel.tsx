import React from 'react';
import { PackKit } from '../../hooks/usePack';

export function KitOverviewPanel({ kit }: { kit: PackKit }) {
    return (
        <div className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>
                {kit.items.length} items in this kit
            </p>
            <hr />
            <div>Common "{kit.name}" Items</div>
        </div>
    );
}
