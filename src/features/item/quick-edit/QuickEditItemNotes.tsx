import React from 'react';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';
import { Textarea } from '@/ui/textarea';

export function QuickEditItemNotes() {
    const { item, isReadOnly } = useItemContext();
    const { updateItem } = useAppMutations();
    if (!item) return null;
    return (
        <Textarea
            id='notes'
            disabled={isReadOnly}
            value={item.notes}
            onChange={(e) => updateItem({ ...item, notes: e.target.value })}
            className='flex-1'
        />
    );
}
