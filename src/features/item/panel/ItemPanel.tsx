import React from 'react';
import { Label } from '@/ui/label';
import { QuickEditItemName } from '../quick-edit/QuickEditItemName';
import { useItemContext } from '../useItem';
import { ScrollArea } from '@/ui/scroll-area';
import { cn } from '@/lib/utils';
import { QuickEditItemIsPacked } from '../quick-edit/QuickEditItemIsPacked';
import { QuickEditItemQuantity } from '../quick-edit/QuickEditItemQuantity';
import { ItemGearTooltip } from './ItemGearTooltip';
import { ItemGearWeightTooltip } from './ItemGearWeightTooltip';
import { QuickEditItemNotes } from '../quick-edit/QuickEditItemNotes';
import { QuickEditItemWeight } from '../quick-edit/QuickEditItemWeight';
import { QuickEditItemWeightType } from '../quick-edit/QuickEditItemWeightType';
import { QuickEditItemGear } from '../quick-edit/QuickEditItemGear';

export const ItemPanel: React.FC = () => {
    const { item } = useItemContext();

    if (!item)
        return (
            <div>
                <h1>Item not found</h1>
            </div>
        );

    return (
        <div className='h-full flex flex-col gap-2 overflow-hidden'>
            <QuickEditItemName className='mb-2' />
            <ScrollArea className='flex-1 overflow-auto'>
                <div className='flex flex-col gap-2'>
                    <ItemField label='Packed' htmlFor='packed-group'>
                        <QuickEditItemIsPacked />
                    </ItemField>
                    <ItemField label='Quantity' htmlFor='quantity'>
                        <QuickEditItemQuantity />
                    </ItemField>
                    <ItemField label='Notes' htmlFor='notes'>
                        <QuickEditItemNotes />
                    </ItemField>
                    <ItemField
                        label='Gear'
                        tooltip={<ItemGearTooltip />}
                        htmlFor='gear'
                    >
                        <QuickEditItemGear />
                    </ItemField>
                    <ItemField
                        label='Weight'
                        tooltip={<ItemGearWeightTooltip />}
                        htmlFor='weight'
                        className={cn(
                            !item.weight && item.gear?.weight && 'opacity-50'
                        )}
                    >
                        <QuickEditItemWeight />
                    </ItemField>
                    <ItemField
                        label='Weight Type'
                        tooltip={<ItemGearWeightTooltip />}
                        htmlFor='weight-type'
                        className={cn(
                            !item.weightType &&
                                item.gear?.weightType &&
                                'opacity-50'
                        )}
                    >
                        <QuickEditItemWeightType />
                    </ItemField>
                </div>
            </ScrollArea>
        </div>
    );
};

function ItemField({
    label,
    tooltip,
    children,
    htmlFor,
    className,
}: {
    label: React.ReactNode;
    tooltip?: React.ReactNode;
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}) {
    return (
        <div className={cn('flex items-start', className)}>
            <Label
                htmlFor={htmlFor}
                className='w-20 text-right p-2 flex items-center justify-end'
            >
                {label} {tooltip}
            </Label>
            {children}
        </div>
    );
}
