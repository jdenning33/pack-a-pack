import React from 'react';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ChevronRight } from 'lucide-react';

export function SelectedKitBreadCrumbs({ className }: { className?: string }) {
    const {
        selectedKit,
        setSelectedItemId,
        selectedItem,
        isEditingProductDetails,
        setIsEditingProductDetails,
    } = usePackNavigation();

    return (
        <div className={cn('flex items-center gap-1')}>
            <Button
                variant='link'
                size='sm'
                className='px-0 pt-0 h-[unset]'
                onClick={() => setSelectedItemId(null)}
            >
                {selectedKit?.name}
            </Button>
            {selectedItem && (
                <>
                    <ChevronRight size={12} className='text-primary' />
                    <Button
                        variant='link'
                        size='sm'
                        className='px-0 pt-0 h-[unset]'
                        onClick={() => setIsEditingProductDetails(false)}
                    >
                        {selectedItem.name}
                    </Button>
                </>
            )}
            {isEditingProductDetails && (
                <>
                    <ChevronRight size={12} className='text-primary' />
                    <Button
                        variant='link'
                        size='sm'
                        className='px-0 pt-0 h-[unset]'
                        onClick={() => null}
                    >
                        Edit Product
                    </Button>
                </>
            )}
        </div>
    );
}
