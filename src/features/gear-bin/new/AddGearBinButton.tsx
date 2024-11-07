import { Button } from '@/ui/button';
import { GearBinModal, GearBinModalContent } from '../modal/GearBinModal';
import { GearBinModalTrigger } from '../modal/GearBinModalTrigger';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StandardGearBinModalEditContents } from '../modal/StandardGearBinModalEditContents';

export function AddGearBinButton({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <GearBinModal
            isOpen={isOpen}
            onIsOpenChange={setIsOpen}
            onIsEditingChange={(editing) => !editing && setIsOpen(false)}
        >
            <GearBinModalTrigger isEditing={true} asChild>
                <Button
                    {...buttonProps}
                    className={cn(
                        'flex items-center gap-2',
                        buttonProps?.className
                    )}
                >
                    <Plus size={14} />
                    Add Gear Bin
                </Button>
            </GearBinModalTrigger>
            <GearBinModalContent>
                <StandardGearBinModalEditContents />
            </GearBinModalContent>
        </GearBinModal>
    );
}
