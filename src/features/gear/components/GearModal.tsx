import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { useGearContext } from '../useGearContext';
import { EditGearForm } from './edit/EditGearForm';
import {
    StandardEditGearInputs,
    StandardEditGearButtons,
} from './edit/StandardEditGearForm';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';

// GearModal component

export const GearModal: React.FC = () => {
    const { isModalOpen, setIsModalOpen, isEditing, setIsEditing } =
        useGearContext();
    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(isOpen) => {
                setIsModalOpen(isOpen);
                if (!isOpen) setIsEditing(false);
            }}
        >
            <DialogContent>
                {isEditing ? <EditGearModalContent /> : <GearModalContent />}
            </DialogContent>
        </Dialog>
    );
};

const GearModalContent: React.FC = () => {
    const { gear, setIsEditing } = useGearContext();
    if (!gear) return null;

    return (
        <>
            <DialogHeader>
                <div className='w-full max-w-md flex items-center gap-4'>
                    {/* gear image */}
                    <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                        <ImageWithFallback
                            src={gear.image || ''}
                            fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                            alt={gear.name || 'placeholder'}
                            fill={true}
                            sizes='100% 100%'
                            className='rounded object-contain'
                        />
                    </div>
                    <div>
                        <DialogTitle className='leading-tight mb-2'>
                            {gear.name}
                        </DialogTitle>

                        <div className='flex flex-wrap gap-2 mb-2'>
                            <Badge variant='outline' className='bg-background'>
                                {gear.brand}
                            </Badge>
                            <Badge variant='outline'>
                                {gear.weight?.toFixed(0) || '_'} oz
                            </Badge>
                            <Badge variant='outline'>
                                $ {gear.price?.toFixed(0) || '_'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </DialogHeader>
            <DialogDescription className=''>
                {gear.description}
            </DialogDescription>
            <DialogFooter className='mt-4 !justify-start'>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </DialogFooter>
        </>
    );
};

const EditGearModalContent: React.FC = () => {
    const { gear, setIsEditing, afterGearUpdated } = useGearContext();

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit Your Gear</DialogTitle>
                <DialogDescription>
                    Provide details for the gear.
                </DialogDescription>
            </DialogHeader>
            <EditGearForm
                gear={gear}
                afterSave={(gear) => {
                    setIsEditing(false);
                    afterGearUpdated(gear);
                }}
                onCancel={() => setIsEditing(false)}
            >
                <StandardEditGearInputs />
                <DialogFooter className='mt-4 !justify-start'>
                    <StandardEditGearButtons />
                </DialogFooter>
            </EditGearForm>
        </>
    );
};

export const GearModalTrigger: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { setIsModalOpen } = useGearContext();
    return (
        <div onClick={() => setIsModalOpen(true)} className='cursor-pointer'>
            {children}
        </div>
    );
};
