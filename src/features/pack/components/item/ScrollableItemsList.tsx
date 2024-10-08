import React from 'react';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Trash } from 'lucide-react';
import { usePack, PackItem } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

export function ScrollableItemsList({
    items,
    className,
}: {
    items: PackItem[];
    className?: string;
}) {
    const { updateItem, removeItem } = usePack();
    const { setSelectedItemId, selectedItem } = usePackNavigation();
    const toggleItem = async (item: PackItem) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };
    return (
        <ScrollArea className='flex-1 overflow-auto' type='scroll'>
            <ul className='flex-1'>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={cn(
                            'flex items-center justify-between px-4',
                            'hover:bg-primary/30 group cursor-pointer transition-all',
                            item.id === selectedItem?.id &&
                                'bg-primary/20 font-semibold'
                        )}
                        onClick={(e) => {
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
                                onCheckedChange={(e) => {
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
                                {item.name}
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
