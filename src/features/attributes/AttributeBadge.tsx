import { cn } from '@/lib/utils';
import { Badge } from '@/ui/badge';
import React from 'react';
import { AttributeValue } from './EditAttributesList';

export function AttributeBadge({
    attribute,
    includeType = false,
}: {
    attribute: { type: string; value: AttributeValue };
    includeType?: boolean;
}) {
    return (
        <div className='flex' title={`${attribute.type}: ${attribute.value}`}>
            {includeType && (
                <Badge
                    variant='outline'
                    className={cn('w-16 truncate rounded-r-none bg-muted')}
                >
                    <span>{attribute.type}</span>
                </Badge>
            )}
            <Badge
                variant='outline'
                className={cn(
                    'whitespace-nowrap',
                    includeType ? 'rounded-l-none' : ''
                )}
            >
                <span>{attribute.value}</span>
            </Badge>
        </div>
    );
}
