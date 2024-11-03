import React from 'react';
import { DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { useGearBin } from '../../useGearBin';
import { Button } from '@/ui/button';
import { useGearBinModalContext } from './GearBinModal';

export const GearBinModalContent: React.FC = () => {
    const { gearBin } = useGearBin();
    const { setIsEditing } = useGearBinModalContext();

    if (!gearBin) return null;

    return (
        <>
            <DialogHeader className=''>
                <div className='gap-4 items-baseline'>
                    <DialogTitle className='text-2xl font-bold text-left'>
                        {gearBin.name}
                    </DialogTitle>
                </div>
            </DialogHeader>
            <div>
                {gearBin.description}
                {!gearBin.description && (
                    <span className='text-muted-foreground'>
                        No description
                    </span>
                )}
            </div>
            <DialogFooter className='flex flex-row gap-2 !justify-start mt-4'>
                <Button variant='outline' onClick={() => setIsEditing(true)}>
                    Edit Details
                </Button>
            </DialogFooter>
        </>
    );
};
