import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/ui/dialog';
import { ItemPanel } from '../item/ItemPanel';
import { ScrollableItemsList } from '../item/ScrollableItemsList';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { QuickAddPackItem } from '../item/QuickAddItemInput';
import { cn } from '@/lib/utils';
import { KitOverviewPanel } from './KitOverviewPanel';
import { SelectedKitBreadCrumbs } from './SelectedKitBreadCrumbs';

export const SelectedKitModal = ({}) => {
    const { setSelectedKitId, selectedKit, setSelectedItemId, selectedItem } =
        usePackNavigation();

    const kit = selectedKit;

    if (!kit) return null;

    return (
        <Dialog
            open={!!selectedKit}
            onOpenChange={(_) => {
                setSelectedKitId(null);
                setSelectedItemId(null);
            }}
        >
            <DialogContent className='min-h-[30rem] h-[40rem] max-h-svh max-w-4xl p-0 flex flex-col gap-0'>
                <DialogHeader className='p-4 pb-3 border-b text-left'>
                    <DialogTitle>{kit.name}</DialogTitle>
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
                            items={kit.items}
                        />
                    </div>
                    <div className='w-3/5 border-l bg-secondary flex flex-col'>
                        <div className='px-4 pt-2'>
                            <SelectedKitBreadCrumbs />
                        </div>

                        <div className='p-4 flex-1'>
                            {selectedItem ? (
                                <ItemPanel item={selectedItem} />
                            ) : (
                                <KitOverviewPanel kit={kit} />
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
