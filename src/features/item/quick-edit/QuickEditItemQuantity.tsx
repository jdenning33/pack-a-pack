import React from 'react';
import { Input } from '@/ui/input';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext } from '../useItem';

export function QuickEditItemQuantity() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();

    function setQuantity(quantity: number) {
        updateItem({ ...item, quantity });
    }
    return isReadOnly ? (
        <span>{item.quantity}</span>
    ) : (
        <Input
            id='quantity'
            type='number'
            value={item.quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='w-16 h-8 bg-background'
            min={1}
        />
    );
}
