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
        isEditingGearDetails,
        setIsEditingGearDetails,
    } = usePackNavigation();

    return (
        <div className={cn('flex items-center gap-1', className)}>
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
