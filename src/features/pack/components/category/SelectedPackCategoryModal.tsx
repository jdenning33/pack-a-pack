import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/ui/dialog';
import { ItemDetailsPanel } from '../item/ItemDetailsPanel';
import { ScrollableCategoryItemsList } from '../item/ScrollableCategoryItemsList';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { QuickAddPackItem } from '../item/QuickAddPackItem';
import { cn } from '@/lib/utils';

export const SelectedPackCategoryModal = ({}) => {
    const {
        setSelectedCategoryId,
        selectedCategory,
        setSelectedItemId,
        selectedItem,
    } = usePackNavigation();

    const category = selectedCategory;

    if (!category) return null;

    return (
        <Dialog
            open={!!selectedCategory}
            onOpenChange={(_) => setSelectedCategoryId(null)}
        >
            <DialogContent className='min-h-[30rem] max-h-svh max-w-4xl p-0 flex flex-col gap-0'>
                <DialogHeader className='p-4 pb-3 border-b text-left'>
                    <DialogTitle>{category.name}</DialogTitle>
                    <DialogDescription>
                        {category.description}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-1 overflow-hidden'>
                    <div
                        className={cn(
                            'flex flex-col gap-4 overflow-hidden',
                            'py-4 w-2/5'
                        )}
                    >
                        <ScrollableCategoryItemsList
                            className='py-4 w-2/5'
                            category={category}
                        />
                        <div className='px-4'>
                            <QuickAddPackItem categoryId={category.id} />
                        </div>
                    </div>
                    <div className='w-3/5 border-l bg-secondary'>
                        {selectedItem ? (
                            <ItemDetailsPanel
                                item={selectedItem}
                                products={selectedItem.prospectiveProducts}
                                onDismiss={() => setSelectedItemId(null)}
                            />
                        ) : (
                            <div className='p-4 flex flex-col gap-4'>
                                <p className='text-muted-foreground'>
                                    {category.items.length} items in this
                                    category
                                </p>
                                <hr />
                                <div>Common "{category.name}" Items</div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
