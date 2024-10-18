import React from 'react';
import { Gear } from '@/lib/appTypes';
import { AlternateGearPanel } from '../../gear-search/components/AlternateGearPanel';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { NoGearSelectedHolder } from '@/features/item/components/NoGearSelectedHolder';
import { GearDetailCard } from '@/features/gear/components/GearDetailCard';
import {
    GearDeleteOption,
    GearEditOption,
    GearOpenModalOption,
    GearRemoveFromItemOption,
} from '@/features/gear/components/GearQuickOptionsMenu';
import { GearQuickOptionsMenu } from '@/features/gear/components/GearQuickOptionsMenu';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { QuickEditItemName } from './QuickEditItemName';
import { cn } from '@/lib/utils';
import { GearProvider } from '@/features/gear/GearProvider';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext, useItemContext } from '../useItem';
import {
    GearModal,
    GearModalTrigger,
} from '@/features/gear/components/GearModal';

export const ItemPanel: React.FC = () => {
    const { updateItem } = useAppMutations();
    const { item, isReadOnly, isEditingGearDetails, setIsEditingGearDetails } =
        useItemContext();

    if (!item)
        return (
            <div>
                <h1>Item not found</h1>
            </div>
        );

    function afterGearUpdated(gear: Gear) {
        updateItem({
            ...item!,
            gear: gear,
            gearId: gear?.id,
        });
        setIsEditingGearDetails(false);
    }

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1'>
                <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-2 space-y-4 sm:space-y-0'>
                    <QuickEditItemName />
                    <div className='flex items-center gap-4'>
                        <QuickEditItemQuantity />
                        <QuickEditItemIsPacked />
                    </div>
                </div>
                <GearProvider
                    gear={item.gear}
                    useModal={true}
                    onIsEditingChanged={setIsEditingGearDetails}
                    afterGearUpdated={afterGearUpdated}
                >
                    {!isReadOnly && (
                        <GearQuickOptionsMenu>
                            <GearOpenModalOption />
                            <GearRemoveFromItemOption item={item} />
                            <GearEditOption />
                            <DropdownMenuSeparator />
                            <GearDeleteOption />
                        </GearQuickOptionsMenu>
                    )}
                    <GearModalTrigger>
                        <GearDetailCard />
                    </GearModalTrigger>
                    <NoGearSelectedHolder className='p-2' />
                    <GearModal />
                </GearProvider>
            </div>

            <AlternateGearPanel
                className={cn(
                    'pt-12 shrink-0',
                    isEditingGearDetails ? 'hidden' : ''
                )}
                itemFilter={item.name}
                onSelected={isReadOnly ? undefined : afterGearUpdated}
            />
        </div>
    );
};

function QuickEditItemQuantity() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();

    function setQuantity(quantity: number) {
        updateItem({ ...item, quantity });
    }
    return (
        <div className='flex items-center space-x-1'>
            <Label htmlFor='quantity' className='text-sm font-medium'>
                Qty:
            </Label>
            {isReadOnly ? (
                <span>{item.quantity}</span>
            ) : (
                <Input
                    id='quantity'
                    type='number'
                    value={item.quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className='w-16 h-8 bg-background'
                    min={1}
                />
            )}
        </div>
    );
}

function QuickEditItemIsPacked() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();
    function setIsPacked(isPacked: boolean) {
        updateItem({ ...item, isPacked });
    }
    return (
        <div className='flex items-center space-x-1'>
            <Label htmlFor='packed' className='text-sm font-medium'>
                Packed:
            </Label>
            {isReadOnly ? (
                <span>{item.isPacked ? 'Yes' : 'No'}</span>
            ) : (
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
            )}
        </div>
    );
}
