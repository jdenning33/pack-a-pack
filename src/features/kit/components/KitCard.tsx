import React from 'react';
import { Checkbox } from '@/ui/checkbox';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '@/ui/card';
import { cn } from '@/lib/utils';
import { Item } from '@/lib/appTypes';
import { useKitContext } from '../useKitContext';
import { usePack } from '@/features/pack/hooks/usePack';
import { StandardEditKitForm } from './edit/StandardEditKitForm';

export const KitCard = ({ className }: { className?: string }) => {
    const { kit, isEditing, setIsEditing, isModalOpen } = useKitContext();

    if (!kit) return null;
    return (
        <Card
            className={cn(
                'hover:shadow-lg hover:scale-[101%] transition-all relative',
                className
            )}
        >
            {isEditing && !isModalOpen ? (
                <StandardEditKitForm
                    className='p-4'
                    kit={kit}
                    onCancel={() => setIsEditing(false)}
                    afterSave={(_) => setIsEditing(false)}
                />
            ) : (
                <>
                    <CardHeader className='flex justify-between'>
                        <CardTitle className='flex justify-between'>
                            {kit.name}
                        </CardTitle>
                        <CardDescription>{kit.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {kit.items.length === 0 ? (
                            <p className='text-muted-foreground'>
                                No items in this kit yet.
                            </p>
                        ) : (
                            <ul className='space-y-2'>
                                {kit.items.map((item) => (
                                    <KitItemLineItem
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </>
            )}
        </Card>
    );
};

function KitItemLineItem({ item }: { item: Item }) {
    const { updateItem } = usePack();
    const { setSelectedItemId, setIsModalOpen } = useKitContext();

    const toggleItem = async (item: Item) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };

    return (
        <li key={item.id} className='flex items-center space-x-2 w-fit'>
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
                    // setSelectedKitId(kit.id);
                    setIsModalOpen(true);
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
    );
}
