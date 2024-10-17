import React, { useContext, useState } from 'react';
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
import { useKitContext } from '../../useKitContext';
import { StandardEditKitForm } from '../edit/StandardEditKitForm';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { KitModalContext } from '../modal/KitModal';

export const KitCardContext = React.createContext<{
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
} | null>(null);

export function useKitCardContext() {
    const context = React.useContext(KitCardContext);
    if (!context) {
        throw new Error(
            'useKitCardContext must be used within a KitCardProvider'
        );
    }
    return context;
}

export const KitCard = ({
    className,
    onItemSelected,
    children,
}: {
    className?: string;
    onItemSelected?: (item: Item) => void;
    children?: React.ReactNode;
}) => {
    const { kit } = useKitContext();
    const [isEditing, setIsEditing] = useState(false);

    if (!kit) return null;
    return (
        <KitCardContext.Provider value={{ isEditing, setIsEditing }}>
            <Card
                className={cn(
                    'hover:shadow-lg hover:scale-[101%] transition-all relative',
                    className
                )}
            >
                {children}
                {isEditing ? (
                    <StandardEditKitForm
                        onFinished={() => setIsEditing(false)}
                        className='p-4'
                    />
                ) : (
                    <>
                        <CardHeader className='flex justify-between pb-4'>
                            <CardTitle className='flex justify-between'>
                                {kit.name}
                            </CardTitle>
                            <CardDescription className='line-clamp-1'>
                                {kit.description}
                            </CardDescription>
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
                                            onItemSelected={onItemSelected}
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
        </KitCardContext.Provider>
    );
};

function KitItemLineItem({
    item,
    onItemSelected,
}: {
    item: Item;
    onItemSelected?: (item: Item) => void;
}) {
    const { updateItem } = useAppMutations();

    const modalContext = useContext(KitModalContext);

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
                    modalContext?.setIsOpen(true);
                    onItemSelected?.(item);
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
