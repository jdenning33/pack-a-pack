import React from 'react';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Trash } from 'lucide-react';
import { usePack } from '../../hooks/usePack';
import { Item } from '@/lib/appTypes';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

export function ScrollableItemsList({
    items,
    className,
}: {
    items: Item[];
    className?: string;
}) {
    const { updateItem, deleteItem: removeItem } = usePack();
    const { setSelectedItemId, selectedItem } = usePackNavigation();
    const toggleItem = async (item: Item) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };
    return (
        <ScrollArea
            className={cn('flex-1 overflow-auto', className)}
            type='scroll'
        >
            <ul className='flex-1 w-full'>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={cn(
                            'flex items-center justify-between px-4',
                            'hover:bg-primary/30 group cursor-pointer transition-all',
                            item.id === selectedItem?.id &&
                                'bg-primary/20 font-semibold'
                        )}
                        onClick={(_) => {
                            setSelectedItemId(item.id);
                        }}
                    >
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                                id={`drawer-item-${item.id}`}
                                checked={item.isPacked}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                onCheckedChange={(_) => {
                                    toggleItem(item);
                                }}
                            />
                            <label
                                htmlFor={`drawer-item-${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:underline cursor-pointer'
                            >
                                {item.name}{' '}
                                {item.quantity > 1 && (
                                    <span className='text-xs font-semibold text-muted-foreground'>
                                        x{item.quantity}
                                    </span>
                                )}
                            </label>
                        </div>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeItem(item)}
                        >
                            <Trash className='h-4 w-4' />
                        </Button>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    );
}
