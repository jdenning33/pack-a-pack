import React from 'react';
import { Button } from '@/ui/button';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';
import { EditWeightTypeToggle } from '@/features/shared/EditWeightTypeToggle';

export function QuickEditItemWeightType() {
    const { item, isReadOnly } = useItemContext();
    const { updateItem } = useAppMutations();
    if (!item) return null;
    return (
        <>
            <EditWeightTypeToggle
                weightType={item.weightType || item.gear?.weightType || 'base'}
                buttonSize='sm'
                onChange={(v) => {
                    updateItem({ ...item, weightType: v });
                }}
                activeButtonVariant='default'
                inactiveButtonVariant='outline'
                disabled={isReadOnly}
            />
            {item.weightType && item.gear?.weightType && (
                <Button
                    className='translate-y-1 opacity-80'
                    disabled={isReadOnly}
                    variant='link'
                    size='sm'
                    onClick={() => {
                        updateItem({
                            ...item,
                            weightType: null,
                        });
                    }}
                >
                    use gear weight type
                </Button>
            )}
        </>
    );
}
