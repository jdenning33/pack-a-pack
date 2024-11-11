import React from 'react';
import { Kit } from '@/lib/appTypes';

export function KitOverviewPanel({ kit }: { kit: Kit }) {
    return (
        <div className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>
                {kit.items.length} items in this kit
            </p>
            <hr />
            {/* <div>Common &quot;{kit.name}&quot; Items</div> */}
        </div>
    );
}
