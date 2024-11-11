import { Button } from '@/ui/button';
import { OpinonatedCombobox } from '@/ui/combobox';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
import { CheckIcon, TrashIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AttributeBadge } from './AttributeBadge';
import { AttributeValue } from './EditAttributesList';

export function EditAttributePopover({
    attribute,
    onUpdate,
    onDelete,
    availableAttributes,
}: {
    attribute?: { type: string; value: AttributeValue };
    onUpdate: (value: { type: string; value: AttributeValue }) => void;
    onDelete?: () => void;
    availableAttributes?: string[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [editType, setEditType] = useState(attribute?.type);
    const [editValue, setEditValue] = useState<string | number>(
        attribute?.value?.toString() || ''
    );

    useEffect(() => {
        setEditType(attribute?.type);
        setEditValue(attribute?.value || '');
    }, [attribute, isOpen]);

    const handleSave = () => {
        if (!editType || !editValue) return;

        onUpdate({
            type: editType,
            value: editValue,
        });
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setEditType(attribute?.type);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                {attribute?.type ? (
                    <AttributeBadge attribute={attribute} includeType />
                ) : (
                    <div className='px-2.5 py-1 text-xs bg-muted/0 hover:bg-muted/100 rounded font-medium '>
                        Add Attribute
                    </div>
                )}
            </PopoverTrigger>
            <PopoverContent
                align='start'
                side='bottom'
                alignOffset={-40}
                className='p-2 bg-muted flex w-fit '
            >
                <PopoverArrow className='fill-muted-foreground' />
                <OpinonatedCombobox
                    triggerClassName='w-24 rounded-r-none focus:z-10 bg-background truncate'
                    title={editType || 'Attribute Type'}
                    placeholder='Type'
                    searchTextPlaceholder='Attribute Type...'
                    allowCustom={true}
                    value={editType}
                    defaultOpen={false}
                    onValueChange={setEditType}
                    options={availableAttributes || []}
                />
                <Input
                    type='text'
                    autoFocus
                    className='w-36 rounded-l-none bg-background focus:z-10'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder='Value'
                />
                <Button
                    variant='outline'
                    size='icon'
                    className='ml-3'
                    onClick={handleSave}
                >
                    <CheckIcon size={18} />
                </Button>
                <Button
                    variant='outline'
                    size='icon'
                    className='ml-1'
                    onClick={handleCancel}
                >
                    <XIcon size={18} />
                </Button>
                {attribute?.type && (
                    <Button
                        variant='outline'
                        size='icon'
                        className='ml-3'
                        onClick={onDelete}
                    >
                        <TrashIcon size={18} />
                    </Button>
                )}
            </PopoverContent>
        </Popover>
    );
}
