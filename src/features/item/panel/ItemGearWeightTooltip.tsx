import React from 'react';
import { OpinionatedTooltip } from '@/ui/tooltip';

export function ItemGearWeightTooltip() {
    return (
        <OpinionatedTooltip side='right' className='max-w-48'>
            This weight will only apply for this trip. If you want this weight
            to reflect for future trips update the gear weight instead. This
            will default to the gear weight if you have selected gear.
        </OpinionatedTooltip>
    );
}
