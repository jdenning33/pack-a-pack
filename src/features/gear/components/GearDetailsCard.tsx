import React, { useEffect, useState } from 'react';
import { Card } from '@/ui/card';
import { Gear } from '@/lib/appTypes';
import { Button } from '@/ui/button';
import { Edit } from 'lucide-react';
import { EditGearForm } from './EditGearForm';
import { Optional } from '@/lib/utils';
import { GearDetailsPanel } from './GearDetailsPanel';
import { GearQuickOptionsMenuButton } from './GearQuickOptionsMenuButton';

export function GearDetailsCard({
    gear,
    isEditing = false,
    allowEdit = true,
    onIsEditingChange,
    onFinished,
}: {
    gear: Optional<Gear, 'id'>;
    isEditing?: boolean;
    allowEdit?: boolean;
    onIsEditingChange?: (isEditing: boolean) => void;
    onFinished?: (gear: Gear | undefined) => void;
}) {
    const [isEditingLocal, setIsEditingLocal] = useState(
        isEditing && allowEdit
    );
    useEffect(() => {
        setIsEditingLocal(isEditing);
        onIsEditingChange?.(isEditing);
    }, [isEditing]);

    return (
        <Card className='p-4 relative'>
            {!allowEdit && gear.id && (
                <GearQuickOptionsMenuButton
                    gear={gear as Gear}
                    className='absolute top-1 right-1'
                />
            )}
            {isEditingLocal ? (
                <EditGearForm
                    gear={gear}
                    onFinished={(updatedGear) => {
                        onFinished?.(updatedGear);
                        setIsEditingLocal(false);
                    }}
                />
            ) : (
                <>
                    {allowEdit && (
                        <Button
                            variant='ghost'
                            className='absolute top-0 right-0'
                        >
                            <Edit
                                className='h-4 w-4'
                                onClick={(_) => setIsEditingLocal(true)}
                            />
                        </Button>
                    )}
                    <GearDetailsPanel gear={gear} />
                </>
            )}
        </Card>
    );
}
