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
import { useKitContext } from '../../KitDetails';
import { QuickAddPackItem } from '@/features/pack/components/item/QuickAddItemInput';
import { ScrollableItemsList } from '@/features/pack/components/item/ScrollableItemsList';
import { ItemPanel } from '@/features/pack/components/item/ItemPanel';
import {
    StandardEditKitButtons,
    StandardEditKitInputs,
} from '../edit/StandardEditKitForm';
import { EditKitForm } from '../edit/EditKitForm';
import { KitOverviewPanel } from './KitOverviewPanel';

export const KitModal = ({}) => {
    const { kit, isEditing, isModalOpen, setIsModalOpen } = useKitContext();

    if (!kit && !isEditing) return null;

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(_) => {
                setIsModalOpen(false);
            }}
        >
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
    const {
        kit,
        setIsEditing,
        setSelectedItemId,
        selectedItem,
        isEditingGearDetails,
        setIsEditingGearDetails,
    } = useKitContext();

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
                        <QuickAddPackItem kitId={kit.id} />
                    </div>
                    <ScrollableItemsList
                        className='py-2'
                        selectedItemId={selectedItem?.id}
                        onItemSelected={(item) => setSelectedItemId(item.id)}
                        items={kit.items}
                    />
                </div>
                <div className='w-3/5 border-l bg-secondary flex flex-col'>
                    <div className='px-4 pt-2'>
                        <KitModalBreadCrumbs />
                    </div>

                    <div className='p-4 flex-1'>
                        {selectedItem ? (
                            <ItemPanel
                                item={selectedItem}
                                isEditingGearDetails={isEditingGearDetails}
                                setIsEditingGearDetails={
                                    setIsEditingGearDetails
                                }
                            />
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
    const { kit, setIsEditing, afterKitUpdated } = useKitContext();

    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>Edit Kit</DialogTitle>
            </DialogHeader>
            {/* <EditKitForm kit={kit} onFinished={() => setIsEditing(false)} /> */}
            <EditKitForm
                kit={kit}
                afterSave={(k) => {
                    setIsEditing(false);
                    afterKitUpdated?.(k);
                }}
                onCancel={() => setIsEditing(false)}
                className='h-full flex flex-col gap-4 justify-between'
            >
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
    const {
        kit,
        setSelectedItemId,
        selectedItem,
        isEditingGearDetails,
        setIsEditingGearDetails,
    } = useKitContext();

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
                        onClick={() => setIsEditingGearDetails(false)}
                    >
                        {selectedItem.name}
                    </Button>
                </>
            )}
            {isEditingGearDetails && (
                <>
                    <ChevronRight size={12} className='text-primary' />
                    <Button
                        variant='link'
                        size='sm'
                        className='px-0 pt-0 h-[unset]'
                        onClick={() => null}
                    >
                        Edit Gear
                    </Button>
                </>
            )}
        </div>
    );
}
