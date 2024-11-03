import React, { useContext, useState } from 'react';
import { Checkbox } from '@/ui/checkbox';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '@/ui/card';
import { cn, useFormatWeight } from '@/lib/utils';
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
    const modalContext = useContext(KitModalContext);
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
                                <ul className='cursor-default'>
                                    {kit.items.map((item) => (
                                        <KitItemLineItem
                                            onItemSelected={() => {
                                                onItemSelected?.(item);
                                                modalContext?.setSelectedItemId(
                                                    item.id
                                                );
                                            }}
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
    const { isReadOnly } = useKitContext();
    const formatWeight = useFormatWeight();

    const modalContext = useContext(KitModalContext);

    const toggleItem = async (item: Item) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };

    return (
        <li
            key={item.id}
            className='flex p-1 items-center space-x-2 hover:bg-muted text-sm transition-all cursor-pointer'
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                modalContext?.setIsOpen(true);
                onItemSelected?.(item);
            }}
        >
            {!isReadOnly && (
                <Checkbox
                    id={`item-${item.id}`}
                    checked={item.isPacked}
                    onCheckedChange={(_) => toggleItem(item)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    disabled={isReadOnly}
                />
            )}
            <div className='flex-1 overflow-hidden'>
                <div className='flex justify-between items-center w-full'>
                    <div
                        className='text-sm font-medium truncate flex-1'
                        title={
                            item.name +
                            (item.gear ? ' (' + item.gear.name + ')' : '')
                        }
                    >
                        {item.name}
                    </div>
                    <div className='pl-1 text-sm flex items-center'>
                        <span className='mr-1 text-muted-foreground'>
                            {item.quantity > 1 && <>{item.quantity}x</>}
                        </span>
                        {formatWeight(item.weight || item.gear?.weight || 0)}
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='text-xs text-muted-foreground flex-1'>
                        {item.gear && item.gear.name}
                    </div>
                </div>
            </div>
        </li>
    );
}
