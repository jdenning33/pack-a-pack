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
    allowEdit = true,
    onIsEditingChange,
    onFinished,
}: {
    gear: Optional<Gear, 'id'>;
    allowEdit?: boolean;
    onIsEditingChange?: (isEditing: boolean) => void;
    onFinished?: (gear: Gear | undefined) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        onIsEditingChange?.(isEditing);
    }, [isEditing, onIsEditingChange]);

    return (
        <Card className='p-4 relative'>
            {!allowEdit && gear.id && (
                <GearQuickOptionsMenuButton
                    gear={gear as Gear}
                    className='absolute top-1 right-1'
                />
            )}
            {isEditing ? (
                <EditGearForm
                    gear={gear}
                    onFinished={(updatedGear) => {
                        onFinished?.(updatedGear);
                        setIsEditing(false);
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
                                onClick={(_) => setIsEditing(true)}
                            />
                        </Button>
                    )}
                    <GearDetailsPanel gear={gear} />
                </>
            )}
        </Card>
    );
}
