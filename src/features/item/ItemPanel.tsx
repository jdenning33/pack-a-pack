import React from 'react';
import { usePack } from '../pack/hooks/usePack';
import { Gear, Item } from '@/lib/appTypes';
import { AlternateGearPanel } from '../gear-search/components/AlternateGearPanel';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { NoGearSelectedHolder } from '@/features/gear/components/NoGearSelectedHolder';
import { GearDetailCard } from '@/features/gear/components/GearDetailCard';
import {
    GearDeleteOption,
    GearEditOption,
    GearRemoveFromItemOption,
} from '@/features/gear/components/GearQuickOptionsMenu';
import { GearQuickOptionsMenu } from '@/features/gear/components/GearQuickOptionsMenu';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { QuickEditItemName } from './QuickEditItemName';
import { cn } from '@/lib/utils';
import { GearProvider } from '@/features/gear/GearProvider';

export const ItemPanel: React.FC<{
    item: Item;
    isEditingGearDetails: boolean;
    setIsEditingGearDetails: (isEditing: boolean) => void;
}> = ({ item, isEditingGearDetails, setIsEditingGearDetails }) => {
    const { updateItem } = usePack();

    function afterGearUpdated(gear: Gear) {
        updateItem({
            ...item,
            gear: gear,
            gearId: gear?.id,
        });
        setIsEditingGearDetails(false);
    }

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1'>
                <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-2 space-y-4 sm:space-y-0'>
                    <QuickEditItemName item={item} />
                    <div className='flex items-center gap-4'>
                        <QuickEditItemQuantity item={item} />
                        <QuickEditItemIsPacked item={item} />
                    </div>
                </div>
                <GearProvider
                    gear={item.gear}
                    useModal={false}
                    onIsEditingChanged={setIsEditingGearDetails}
                    afterGearUpdated={afterGearUpdated}
                >
                    <GearQuickOptionsMenu>
                        <GearRemoveFromItemOption item={item} />
                        <GearEditOption />
                        <DropdownMenuSeparator />
                        <GearDeleteOption />
                    </GearQuickOptionsMenu>
                    <GearDetailCard />
                    <NoGearSelectedHolder className='p-2' />
                </GearProvider>
            </div>

            <AlternateGearPanel
                className={cn(
                    'pt-12 shrink-0',
                    isEditingGearDetails ? 'hidden' : ''
                )}
                itemFilter={item.name}
                onSelected={afterGearUpdated}
            />
        </div>
    );
};
function QuickEditItemQuantity({ item }: { item: Item }) {
    const { updateItem } = usePack();

    function setQuantity(quantity: number) {
        updateItem({ ...item, quantity });
    }
    return (
        <div className='flex items-center space-x-1'>
            <Label htmlFor='quantity' className='text-sm font-medium'>
                Qty:
            </Label>
            <Input
                id='quantity'
                type='number'
                value={item.quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='w-16 h-8 bg-background'
                min={1}
            />
        </div>
    );
}

function QuickEditItemIsPacked({ item }: { item: Item }) {
    const { updateItem } = usePack();
    function setIsPacked(isPacked: boolean) {
        updateItem({ ...item, isPacked });
    }
    return (
        <div className='flex items-center space-x-1'>
            <Label htmlFor='packed' className='text-sm font-medium'>
                Packed:
            </Label>
            <div id='packed-group' className='flex rounded-md items-center'>
                <Button
                    variant={!item.isPacked ? 'default' : 'outline'}
                    size='sm'
                    className='rounded-r-none'
                    onClick={() => setIsPacked(false)}
                >
                    No
                </Button>
                <Button
                    variant={item.isPacked ? 'default' : 'outline'}
                    size='sm'
                    className='rounded-l-none'
                    onClick={() => setIsPacked(true)}
                >
                    Yes
                </Button>
            </div>
        </div>
    );
}
