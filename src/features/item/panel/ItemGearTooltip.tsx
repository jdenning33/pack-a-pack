import React from 'react';
import { OpinionatedTooltip } from '@/ui/tooltip';

export function ItemGearTooltip() {
    return (
        <OpinionatedTooltip side='right' className='max-w-48'>
            <ul>
                <li>
                    - Item is a type of thing you need to pack, i.e.
                    &quot;Stove&quot;.
                </li>
                <li>
                    - Gear is the actual thing you own, i.e. &quot;MSR Pocket
                    Rocket&quot;.
                </li>
            </ul>
            <br />
            Items belong to a pack and are only used once. Gear, however, can be
            used across multiple packs so that you don&apos;t have to re-enter
            tedious details like weight and price.
        </OpinionatedTooltip>
    );
}
