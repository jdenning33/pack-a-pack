import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ChevronRight } from 'lucide-react';
import { useKitContext } from '../useKitContext';
import { KitOverviewPanel } from './KitOverviewPanel';
import { ItemProvider } from '@/features/item/ItemProvider';
import { ItemLi } from '@/features/item/list-item/ItemLi';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useKitModalContext } from './KitModal';
import { ItemPanel } from '@/features/item/panel/ItemPanel';
import { QuickAddPackItem } from '@/features/item/new/QuickAddItemInput';

export function KitModalContent() {
    const { kit, isReadOnly } = useKitContext();
    const { selectedItem, setSelectedItemId } = useKitModalContext();

    if (!kit) return null;

    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>
                    <div className='flex items-center group'>
                        <span className='mr-1'>{kit.name}</span>
                    </div>
                </DialogTitle>
                <DialogDescription>{kit.description}</DialogDescription>
            </DialogHeader>
            <div className='flex flex-1 overflow-hidden'>
                <div
                    className={cn(
                        'flex flex-col gap-4 overflow-hidden',
                        'py-4 w-2/5 flex-1',
                        selectedItem && 'hidden md:flex'
                    )}
                >
                    {!isReadOnly && (
                        <div className='px-4'>
                            <ItemProvider kit={kit} isReadOnly={isReadOnly}>
                                <QuickAddPackItem />
                            </ItemProvider>
                        </div>
                    )}
                    <ScrollArea
                        className={cn('flex-1 overflow-auto py-2')}
                        type='scroll'
                    >
                        <ul className='flex-1 w-full'>
                            {kit.items.map((item) => (
                                <ItemProvider
                                    isReadOnly={isReadOnly}
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
                <div
                    className={cn(
                        'flex-[2] w-3/5 shrink-0 border-l bg-secondary flex flex-col',
                        !selectedItem && 'hidden sm:flex'
                    )}
                >
                    <div className='px-4 pt-2'>
                        <KitModalBreadCrumbs />
                    </div>

                    <div className='p-4 flex-1 overflow-hidden'>
                        {selectedItem ? (
                            <ItemProvider
                                item={selectedItem}
                                kit={kit}
                                isReadOnly={isReadOnly}
                            >
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
}
function KitModalBreadCrumbs({ className }: { className?: string }) {
    const { kit } = useKitContext();
    const { selectedItem, setSelectedItemId } = useKitModalContext();
    return (
        <div className={cn('flex items-center gap-1', className)}>
            <Button
                variant='link'
                size='sm'
                className='px-0 pt-0 h-[unset]'
                onClick={() => setSelectedItemId(undefined)}
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
