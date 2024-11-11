import React from 'react';
import { Button } from '@/ui/button';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';
import { EditWeightPopover } from '@/features/shared/EditWeightPopover';

export function QuickEditItemWeight() {
    const { item, isReadOnly } = useItemContext();
    const { updateItem } = useAppMutations();
    if (!item) return null;
    return (
        <>
            <EditWeightPopover
                disabled={isReadOnly}
                grams={item.weight || item.gear?.weight || 0}
                onChange={(v) => {
                    updateItem({ ...item, weight: v });
                }}
            />
            {item.weight && item.gear?.weight !== undefined && (
                <Button
                    disabled={isReadOnly}
                    className='translate-y-1 opacity-80'
                    variant='link'
                    size='sm'
                    onClick={() => {
                        updateItem({ ...item, weight: null });
                    }}
                >
                    use gear weight
                </Button>
            )}
        </>
    );
}
