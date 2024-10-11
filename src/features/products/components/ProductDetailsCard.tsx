import React from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Gear } from '../useProducts';
import { Button } from '@/ui/button';
import { Edit } from 'lucide-react';
import { EditProductForm } from './EditProductForm';

export function ProductDetailsCard2({ product }: { product: Gear }) {
    return (
        <div className='w-full max-w-md'>
            <div className='flex'>
                <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <ImageWithFallback
                        src={product.image || ''}
                        fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        alt={product.name}
                        layout='fill'
                        objectFit='contain'
                        className='rounded'
                    />
                </div>
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {product.name}
                    </h3>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <Badge variant='outline' className='bg-background'>
                            {product.brand}
                        </Badge>
                        <Badge variant='outline'>
                            {product.weight.toFixed(0)} oz
                        </Badge>
                        <Badge variant='outline'>
                            ${product.price.toFixed(0)}
                        </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function ProductDetailsCard({
    gear,
    isEditing,
    onIsEditingChange,
}: {
    gear: Gear;
    isEditing: boolean;
    onIsEditingChange: (isEditing: boolean) => void;
}) {
    return (
        <Card className='p-4 relative'>
            {isEditing ? (
                <EditProductForm
                    product={gear}
                    onFinished={() => onIsEditingChange(false)}
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
        gear: Gear;
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
                        layout='fill'
                        objectFit='contain'
                        className='rounded'
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
