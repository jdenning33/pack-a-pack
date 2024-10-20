import React from 'react';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Trash } from 'lucide-react';
import { Item } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext } from '../useItem';

export function ItemLi({
    onItemSelected,
    selectedItemId,
}: {
    onItemSelected?: (item: Item) => void;
    selectedItemId?: string;
}): React.JSX.Element {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem, deleteItem } = useAppMutations();
    const toggleItem = async (item: Item) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };

    return (
        <li
            key={item.id}
            className={cn(
                'flex items-center justify-between px-4 min-h-6',
                'hover:bg-primary/30 group cursor-pointer transition-all',
                item.id === selectedItemId && 'bg-primary/20 font-semibold'
            )}
            onClick={(_) => {
                onItemSelected?.(item);
            }}
        >
            <div className='flex items-center space-x-2'>
                {!isReadOnly && (
                    <Checkbox
                        id={`drawer-item-${item.id}`}
                        checked={item.isPacked}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onCheckedChange={(_) => {
                            toggleItem(item);
                        }}
                        disabled={isReadOnly}
                    />
                )}
                <label
                    htmlFor={`drawer-item-${item.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className='text-sm leading-none group-hover:underline cursor-pointer'
                >
                    {item.name}{' '}
                    {item.quantity > 1 && (
                        <span className='text-xs font-semibold text-muted-foreground'>
                            x{item.quantity}
                        </span>
                    )}
                </label>
            </div>
            {!isReadOnly && (
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(item);
                    }}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            )}
        </li>
    );
}
