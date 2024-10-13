import React from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Gear } from '@/lib/appTypes';
import { Button } from '@/ui/button';
import { Edit } from 'lucide-react';
import { EditGearForm } from './EditGearForm';
import { Optional } from '@/lib/utils';

export function GearDetailsCard2({ gear }: { gear: Gear }) {
    return (
        <div className='w-full max-w-md'>
            <div className='flex'>
                <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <ImageWithFallback
                        src={gear.image || ''}
                        fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        alt={gear.name}
                        fill={true}
                        sizes='100% 100%'
                        className='rounded object-contain'
                    />
                </div>
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {gear.name}
                    </h3>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <Badge variant='outline' className='bg-background'>
                            {gear.brand}
                        </Badge>
                        <Badge variant='outline'>
                            {gear.weight.toFixed(0)} oz
                        </Badge>
                        <Badge variant='outline'>
                            ${gear.price.toFixed(0)}
                        </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                        {gear.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function GearDetailsCard({
    gear,
    isEditing,
    onIsEditingChange,
    onFinished,
}: {
    gear: Optional<Gear, 'id'>;
    isEditing: boolean;
    onIsEditingChange: (isEditing: boolean) => void;
    onFinished?: (gear: Gear | undefined) => void;
}) {
    return (
        <Card className='p-4 relative'>
            {isEditing ? (
                <EditGearForm
                    gear={gear}
                    onFinished={(updatedGear) => {
                        onFinished?.(updatedGear);
                        onIsEditingChange(false);
                    }}
                />
            ) : (
                <GearDetails
                    gear={gear}
                    onIsEditingChange={onIsEditingChange}
                />
            )}
        </Card>
    );

    function GearDetails({
        gear,
        onIsEditingChange,
    }: {
        gear: Optional<Gear, 'id'>;
        onIsEditingChange: (isEditing: boolean) => void;
    }): React.ReactNode {
        return (
            <div className='w-full max-w-md flex '>
                {/* edit button top right */}
                <Button variant='ghost' className='absolute top-0 right-0'>
                    <Edit
                        className='h-4 w-4'
                        onClick={(_) => onIsEditingChange(true)}
                    />
                </Button>
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
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {gear.name}
                    </h3>
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
                    <p className='text-sm text-muted-foreground line-clamp-4'>
                        {gear.description}
                    </p>
                </div>
            </div>
        );
    }
}
