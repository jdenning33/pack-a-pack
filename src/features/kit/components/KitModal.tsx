import React, { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ChevronRight, Edit } from 'lucide-react';
import { useKitContext } from '../useKitContext';
import { QuickAddPackItem } from '@/features/item/components/QuickAddItemInput';
import { ItemPanel } from '@/features/item/components/ItemPanel';
import {
    StandardEditKitButtons,
    StandardEditKitInputs,
} from './edit/StandardEditKitForm';
import { EditKitForm } from './edit/EditKitForm';
import { KitOverviewPanel } from './KitOverviewPanel';
import { ItemProvider } from '@/features/item/ItemProvider';
import { ItemLi } from '@/features/item/components/ItemLi';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const KitModal = ({}) => {
    const { kit, isEditing, isModalOpen, setIsModalOpen } = useKitContext();

    if (!kit && !isEditing) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={(_) => setIsModalOpen(false)}>
            <DialogContent className='min-h-[30rem] h-[40rem] max-h-svh max-w-4xl p-0 flex flex-col gap-0'>
                {isEditing || !kit ? (
                    <EditingKitModalContent />
                ) : (
                    <KitModalContent />
                )}
            </DialogContent>
        </Dialog>
    );
};

export function KitModalTrigger({ children }: { children: ReactNode }) {
    const { setIsModalOpen } = useKitContext();
    return (
        <div onClick={() => setIsModalOpen(true)} className='cursor-pointer'>
            {children}
        </div>
    );
}

function KitModalContent({}) {
    const { kit, setIsEditing, setSelectedItemId, selectedItem } =
        useKitContext();

    if (!kit) return null;

    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>
                    <div
                        className='flex items-center group'
                        onClick={(e) => e.detail === 2 && setIsEditing(true)}
                    >
                        <span className='mr-1'>{kit.name}</span>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='opacity-0 group-hover:opacity-100 h-[unset] w-[unset] p-[.3rem]'
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit size={12} />
                        </Button>
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
}

function EditingKitModalContent({}) {
    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>Edit Kit</DialogTitle>
            </DialogHeader>
            <EditKitForm className='h-full flex flex-col gap-4 justify-between'>
                <div className='p-4 w-fit'>
                    <StandardEditKitInputs />
                </div>
                <DialogFooter className='p-4 !justify-start'>
                    <StandardEditKitButtons />
                </DialogFooter>
            </EditKitForm>
        </>
    );
}

export function KitModalBreadCrumbs({ className }: { className?: string }) {
    const { kit, setSelectedItemId, selectedItem } = useKitContext();

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
