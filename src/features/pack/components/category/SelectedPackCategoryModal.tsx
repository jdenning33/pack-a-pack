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

export const SelectedPackCategoryModal = ({}) => {
    const { setSelectedCategoryId, selectedCategory, selectedItem } =
        usePackNavigation();

    const category = selectedCategory;

    if (!category) return null;

    return (
        <Dialog
            open={!!selectedCategory}
            onOpenChange={(_) => setSelectedCategoryId(null)}
        >
            <DialogContent className='h-[30rem] max-h-svh max-w-4xl p-0 flex flex-col gap-0'>
                <DialogHeader className='p-4 border-b text-left'>
                    <DialogTitle>{category.name}</DialogTitle>
                    <DialogDescription>
                        {category.description}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-1 overflow-hidden'>
                    <ScrollableCategoryItemsList category={category} />
                    <div className='w-3/5 border-l p-4 bg-secondary'>
                        {selectedItem ? (
                            <ItemDetailsPanel
                                item={selectedItem}
                                products={selectedItem.prospectiveProducts}
                            />
                        ) : (
                            <p className='text-muted-foreground'>
                                {category.items.length} items in this category
                            </p>
                        )}
                    </div>{' '}
                </div>
            </DialogContent>
        </Dialog>
    );
};
