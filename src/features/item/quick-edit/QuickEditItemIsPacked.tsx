import React from 'react';
import { Button } from '@/ui/button';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext } from '../useItem';

export function QuickEditItemIsPacked() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();
    function setIsPacked(isPacked: boolean) {
        updateItem({ ...item, isPacked });
    }
    return isReadOnly ? (
        <span>{item.isPacked ? 'Yes' : 'No'}</span>
    ) : (
        <div id='packed-group' className='flex rounded-md items-center'>
            <Button
                variant={!item.isPacked ? 'default' : 'outline'}
                size='sm'
                className='rounded-r-none'
                onClick={() => setIsPacked(false)}
            >
                No
            </Button>
            <Button
                variant={item.isPacked ? 'default' : 'outline'}
                size='sm'
                className='rounded-l-none'
                onClick={() => setIsPacked(true)}
            >
                Yes
            </Button>
        </div>
    );
}
