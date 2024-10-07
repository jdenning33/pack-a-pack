import React from 'react';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Trash } from 'lucide-react';
import { usePack, Category, PackItem } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { QuickAddPackItem } from './QuickAddPackItem';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export function ScrollableCategoryItemsList({
    category,
}: {
    category: Category;
}) {
    const { updateItem, removeItem } = usePack();
    const { setSelectedItemId } = usePackNavigation();
    const toggleItem = async (item: PackItem) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };
    return (
        <div className='p-4 w-2/5 flex flex-col gap-4 overflow-hidden h-full'>
            <ScrollArea className='flex-1 overflow-auto' type='scroll'>
                <ul className='space-y-1 flex-1'>
                    {category.items.map((item) => (
                        <li
                            key={item.id}
                            className='flex items-center justify-between'
                        >
                            <div className='flex items-center space-x-2'>
                                <Checkbox
                                    id={`drawer-item-${item.id}`}
                                    checked={item.isPacked}
                                    onCheckedChange={() => toggleItem(item)}
                                />
                                <label
                                    htmlFor={`drawer-item-${item.id}`}
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline cursor-pointer'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedItemId(item.id);
                                    }}
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
            <QuickAddPackItem categoryId={category.id} />
        </div>
    );
}
