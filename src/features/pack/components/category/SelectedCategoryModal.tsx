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
import { Edit } from 'lucide-react';
import { EditProductForm } from '@/features/products/components/EditProductForm';
import { CategoryOverviewPanel } from './CategoryOverviewPanel';
import { SelectedCategoryModalNavBar } from './SelectedCategoryModalNavBar';

export const SelectedCategoryModal = ({}) => {
    const {
        setSelectedCategoryId,
        selectedCategory,
        setSelectedItemId,
        selectedItem,
        isEditingProductDetails,
        setIsEditingProductDetails,
    } = usePackNavigation();

    const category = selectedCategory;

    if (!category) return null;

    return (
        <Dialog
            open={!!selectedCategory}
            onOpenChange={(_) => {
                setSelectedCategoryId(null);
                setSelectedItemId(null);
            }}
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
                        <div className='px-4'>
                            <QuickAddPackItem categoryId={category.id} />
                        </div>
                        <ScrollableCategoryItemsList
                            className='py-4 w-2/5'
                            category={category}
                        />
                    </div>
                    <div className='w-3/5 border-l bg-secondary'>
                        <div className='px-4 pt-2'>
                            <SelectedCategoryModalNavBar />
                        </div>

                        <div className='p-4'>
                            {selectedItem && isEditingProductDetails ? (
                                <EditProductForm
                                    product={selectedItem.selectedProduct}
                                    item={selectedItem}
                                    onFinished={() =>
                                        setIsEditingProductDetails(false)
                                    }
                                />
                            ) : selectedItem && !isEditingProductDetails ? (
                                <ItemDetailsPanel item={selectedItem} />
                            ) : (
                                <CategoryOverviewPanel category={category} />
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
