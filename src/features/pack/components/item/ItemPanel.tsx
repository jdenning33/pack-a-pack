import React, { useState } from 'react';
import { usePack } from '../../hooks/usePack';
import { Item } from '@/lib/appTypes';
import { AlternateGearPanel } from '../../../gear/components/AlternateGearPanel';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Check, Edit, X } from 'lucide-react';
import { GearDetailsCard } from '@/features/gear/components/GearDetailsCard';

export const ItemPanel: React.FC<{
    item: Item;
}> = ({ item }) => {
    const { updateItem } = usePack();
    const { isEditingGearDetails, setIsEditingGearDetails } =
        usePackNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name);

    function setQuantity(quantity: number) {
        updateItem({ ...item, quantity });
    }

    function setIsPacked(isPacked: boolean) {
        console.log('isPacked', isPacked);
        updateItem({ ...item, isPacked });
    }

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(item.name);
    };

    const handleConfirm = () => {
        updateItem({ ...item, name: editedName });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedName(item.name);
    };

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1'>
                <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-2 space-y-4 sm:space-y-0'>
                    {isEditing ? (
                        <div className='flex items-center'>
                            <Input
                                value={editedName}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleConfirm();
                                    } else if (e.key === 'Escape') {
                                        handleCancel();
                                    }
                                }}
                                onChange={(e) => setEditedName(e.target.value)}
                                className='text-xl h-10 w-40 mr-1 bg-background'
                            />
                            <Button
                                size='icon'
                                variant='ghost'
                                onClick={handleConfirm}
                                className='w-6'
                            >
                                <Check className='h-4' />
                            </Button>
                            <Button
                                size='icon'
                                variant='ghost'
                                onClick={handleCancel}
                                className='w-6'
                            >
                                <X className='h-4' />
                            </Button>
                        </div>
                    ) : (
                        <div
                            className='flex items-center group'
                            onClick={(e) => e.detail === 2 && handleEdit()}
                        >
                            <h2 className='text-2xl font-bold mr-1'>
                                {item.name}
                            </h2>
                            <Button
                                size='icon'
                                variant='ghost'
                                className='opacity-0 group-hover:opacity-100 h-8 w-6 pt-1'
                                onClick={handleEdit}
                            >
                                <Edit className='h-[.85rem]' />
                            </Button>
                        </div>
                    )}
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center space-x-1'>
                            <Label
                                htmlFor='quantity'
                                className='text-sm font-medium'
                            >
                                Qty:
                            </Label>
                            <Input
                                id='quantity'
                                type='number'
                                value={item.quantity}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                                className='w-16 h-8 bg-background'
                                min={1}
                            />
                        </div>
                        <div className='flex items-center space-x-1'>
                            <Label
                                htmlFor='packed'
                                className='text-sm font-medium'
                            >
                                Packed:
                            </Label>
                            <div className='flex rounded-md items-center'>
                                <Button
                                    variant={
                                        !item.isPacked ? 'default' : 'outline'
                                    }
                                    size='sm'
                                    className='rounded-r-none'
                                    onClick={() => setIsPacked(false)}
                                >
                                    No
                                </Button>
                                <Button
                                    variant={
                                        item.isPacked ? 'default' : 'outline'
                                    }
                                    size='sm'
                                    className='rounded-l-none'
                                    onClick={() => setIsPacked(true)}
                                >
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <GearDetailsCard
                    gear={
                        item.gear || {
                            id: '',
                            isPublic: false,
                            name: '',
                            description: '',
                            brand: '',
                            weight: 0,
                            price: 0,
                            image: '',
                            purchaseLinks: [],
                        }
                    }
                    isEditing={isEditingGearDetails}
                    onIsEditingChange={(isEditing) => {
                        setIsEditingGearDetails(isEditing);
                    }}
                />
            </div>

            {!isEditingGearDetails && (
                <>
                    <AlternateGearPanel
                        className='pt-12 shrink-0'
                        itemFilter={item.name}
                        onSelected={(gear) => {
                            item = {
                                ...item,
                                gear: gear,
                                gearId: gear.id,
                            };
                            updateItem(item);
                        }}
                    />
                </>
            )}
        </div>
    );
};
