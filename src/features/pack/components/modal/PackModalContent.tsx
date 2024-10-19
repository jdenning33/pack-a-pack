import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { usePack } from '../../usePack';
import { Button } from '@/ui/button';
import { usePackModalContext } from './PackModal';

export const PackModalContent: React.FC = () => {
    const { pack } = usePack();
    const { setIsEditing } = usePackModalContext();

    if (!pack) return null;

    return (
        <>
            <DialogHeader>
                <div className='flex items-center gap-4'>
                    <div>
                        <DialogTitle className='text-2xl font-bold'>
                            {pack.name}
                        </DialogTitle>
                        <DialogDescription>
                            {pack.description}
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => setIsEditing(true)}>Edit Pack</Button>
            </DialogFooter>
        </>
    );
};
