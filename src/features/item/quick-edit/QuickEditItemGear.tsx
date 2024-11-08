import React from 'react';
import { Gear } from '@/lib/appTypes';
import { Button } from '@/ui/button';
import { GearDetailCard } from '@/features/gear/card/GearDetailCard';
import { GearEditInModalOption } from '@/features/gear/quick-options/GearEditInModalOption';
import { GearRemoveFromItemOption } from '@/features/gear/quick-options/GearRemoveFromItemOption';
import { GearQuickOptionsMenu } from '@/features/gear/quick-options/GearQuickOptionsMenu';
import { GearProvider } from '@/features/gear/GearProvider';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';
import { GearModal } from '@/features/gear/modal/GearModal';
import Link from 'next/link';
import { StandardUserGearComboBox } from '../../gear/search/list/StandardUserGearComboBox';
import { NoGearSelectedHolder } from '../panel/NoGearSelectedHolder';

export function QuickEditItemGear() {
    const { updateItem } = useAppMutations();

    const { item, isReadOnly, setIsEditingGearDetails } = useItemContext();

    function afterGearUpdated(gear: Gear) {
        updateItem({
            ...item!,
            gear: gear,
            gearId: gear?.id,
        });
        setIsEditingGearDetails(false);
    }

    if (!item) return null;

    return (
        <GearProvider gear={item.gear} afterGearUpdated={afterGearUpdated}>
            {isReadOnly ? (
                <div className='flex-1'>
                    <GearDetailCard />
                </div>
            ) : (
                <GearModal>
                    <GearDetailCard className='flex-1 shadow-sm'>
                        {!isReadOnly && (
                            <GearQuickOptionsMenu>
                                <GearRemoveFromItemOption item={item} />
                                <GearEditInModalOption />
                            </GearQuickOptionsMenu>
                        )}
                    </GearDetailCard>
                    <NoGearSelectedHolder className='text-sm text-muted-foreground flex flex-col items-start'>
                        <div className='flex gap-1 mt-1'>
                            <StandardUserGearComboBox
                                onGearSelect={(g) => {
                                    afterGearUpdated(g);
                                }}
                            />
                            <Link href='/gear' target='_blank'>
                                <Button variant='link'>Find Gear</Button>
                            </Link>
                        </div>
                    </NoGearSelectedHolder>
                </GearModal>
            )}{' '}
        </GearProvider>
    );
}
