import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { EditAttributePopover } from './EditAttributePopover';

export type AttributeValue = string | number;

interface Attributes {
    [key: string]: AttributeValue;
}

export function EditAttributesList({
    className,
    initialAttributes,
    onChange,
    availableAttributes = ['Duration', 'Season', 'Location'],
}: {
    className?: string;
    initialAttributes?: Attributes;
    onChange?: (attributes: Attributes) => void;
    availableAttributes?: string[];
}) {
    const [attributes, setAttributes] = useState<Attributes>(
        initialAttributes || {}
    );

    const remainingAttributes = useMemo(
        () => availableAttributes.filter((attr) => !attributes[attr]),
        [availableAttributes, attributes]
    );

    const handleAttributeUpdate = (
        oldType: string,
        type: string,
        value: AttributeValue
    ) => {
        delete attributes[oldType];
        const newAttributes = {
            ...attributes,
            [type]: value,
        };
        setAttributes(newAttributes);
        onChange?.(newAttributes);
    };

    const handleAttributeDelete = (type: string) => {
        const newAttributes = { ...attributes };
        delete newAttributes[type];
        setAttributes(newAttributes);
        onChange?.(newAttributes);
    };

    return (
        <div className={cn('flex flex-col gap-1 items-start', className)}>
            {Object.entries(attributes || {}).map(([type, value]) => (
                <EditAttributePopover
                    key={type}
                    attribute={{ type, value }}
                    availableAttributes={remainingAttributes}
                    onUpdate={(attr) =>
                        handleAttributeUpdate(type, attr.type, attr.value)
                    }
                    onDelete={() => handleAttributeDelete(type)}
                />
            ))}
            {/* force a line break for flex-row variant */}
            <div className='basis-full h-0'></div>
            <EditAttributePopover
                availableAttributes={remainingAttributes}
                onUpdate={(value) => {
                    handleAttributeUpdate('', value.type, value.value);
                }}
            />
        </div>
    );
}
