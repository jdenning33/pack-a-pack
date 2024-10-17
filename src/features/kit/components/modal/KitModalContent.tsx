import React, { useState } from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ChevronRight, Edit } from 'lucide-react';
import { useKitContext } from '../../useKitContext';
import { QuickAddPackItem } from '@/features/item/components/QuickAddItemInput';
import { ItemPanel } from '@/features/item/components/ItemPanel';
import { KitOverviewPanel } from '../KitOverviewPanel';
import { ItemProvider } from '@/features/item/ItemProvider';
import { ItemLi } from '@/features/item/components/ItemLi';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export function KitModalContent({
    setIsEditing,
}: {
    setIsEditing?: (isEditing: boolean) => void;
}) {
    const { kit } = useKitContext();

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const selectedItem =
        kit?.items.find((item) => item.id === selectedItemId) || null;

    if (!kit) return null;

    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>
                    <div
                        className='flex items-center group'
                        onClick={(e) => e.detail === 2 && setIsEditing?.(true)}
                    >
                        <span className='mr-1'>{kit.name}</span>
                        {setIsEditing && (
                            <Button
                                size='icon'
                                variant='ghost'
                                className='opacity-0 group-hover:opacity-100 h-[unset] w-[unset] p-[.3rem]'
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit size={12} />
                            </Button>
                        )}
                    </div>
                </DialogTitle>
                <DialogDescription>{kit.description}</DialogDescription>
            </DialogHeader>
            <div className='flex flex-1 overflow-hidden'>
                <div
                    className={cn(
                        'flex flex-col gap-4 overflow-hidden',
                        'py-4 w-2/5'
                    )}
                >
                    <div className='px-4'>
                        <ItemProvider kit={kit}>
                            <QuickAddPackItem />
                        </ItemProvider>
                    </div>
                    <ScrollArea
                        className={cn('flex-1 overflow-auto py-2')}
                        type='scroll'
                    >
                        <ul className='flex-1 w-full'>
                            {kit.items.map((item) => (
                                <ItemProvider
                                    key={item.id}
                                    item={item}
                                    kit={kit}
                                >
                                    <ItemLi
                                        key={item.id}
                                        onItemSelected={(item) =>
                                            setSelectedItemId(item.id)
                                        }
                                        selectedItemId={selectedItem?.id}
                                    />
                                </ItemProvider>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
                <div className='w-3/5 border-l bg-secondary flex flex-col'>
                    <div className='px-4 pt-2'>
                        <KitModalBreadCrumbs />
                    </div>

                    <div className='p-4 flex-1'>
                        {selectedItem ? (
                            <ItemProvider item={selectedItem} kit={kit}>
                                <ItemPanel />
                            </ItemProvider>
                        ) : (
                            <KitOverviewPanel kit={kit} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    function KitModalBreadCrumbs({ className }: { className?: string }) {
        return (
            <div className={cn('flex items-center gap-1', className)}>
                <Button
                    variant='link'
                    size='sm'
                    className='px-0 pt-0 h-[unset]'
                    onClick={() => setSelectedItemId(null)}
                >
                    {kit?.name}
                </Button>
                {selectedItem && (
                    <>
                        <ChevronRight size={12} className='text-primary' />
                        <Button
                            variant='link'
                            size='sm'
                            className='px-0 pt-0 h-[unset]'
                        >
                            {selectedItem.name}
                        </Button>
                    </>
                )}
            </div>
        );
    }
}
