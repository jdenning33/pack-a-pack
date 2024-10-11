import React from 'react';
import { Checkbox } from '@/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { cn } from '@/lib/utils';
import { usePack, Item, Kit } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';

interface PackKitProps {
    kit: Kit;
    className?: string;
}

export const KitCard: React.FC<PackKitProps> = ({ kit, className }) => {
    const { updateItem } = usePack();
    const { setSelectedKitId, setSelectedItemId } = usePackNavigation();

    const toggleItem = async (item: Item) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };

    return (
        <Card
            className={cn(
                'hover:shadow-lg hover:scale-[101%] transition-all',
                className
            )}
            onClick={(_) => setSelectedKitId(kit.id)}
        >
            <CardHeader>
                <CardTitle>{kit.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {kit.items.length === 0 ? (
                    <p className='text-muted-foreground'>
                        No items in this kit yet.
                    </p>
                ) : (
                    <ul className='space-y-2'>
                        {kit.items.map((item) => (
                            <li
                                key={item.id}
                                className='flex items-center space-x-2 w-fit'
                            >
                                <Checkbox
                                    id={`item-${item.id}`}
                                    checked={item.isPacked}
                                    onCheckedChange={(_) => toggleItem(item)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />
                                <label
                                    htmlFor={`item-${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedKitId(kit.id);
                                        setSelectedItemId(item.id);
                                    }}
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:cursor-pointer'
                                >
                                    {item.name}{' '}
                                    {item.quantity > 1 && (
                                        <span className='text-xs font-semibold text-muted-foreground'>
                                            x{item.quantity}
                                        </span>
                                    )}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};
