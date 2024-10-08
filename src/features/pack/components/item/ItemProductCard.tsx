import React from 'react';
import { PackItem } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { EditItemProductForm } from './EditItemProductForm';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Edit, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/ui/badge';

export function ItemProductCard({ item }: { item: PackItem }) {
    const { isEditingProductDetails, setIsEditingProductDetails } =
        usePackNavigation();

    return (
        <Card className='p-4 relative'>
            {isEditingProductDetails ? (
                <EditItemProductForm
                    item={item}
                    onFinished={() => setIsEditingProductDetails(false)}
                />
            ) : (
                <ItemProductDetails />
            )}
        </Card>
    );

    function ItemProductDetails(): React.ReactNode {
        return (
            <div className='w-full max-w-md flex '>
                {/* edit button top right */}
                <Button variant='ghost' className='absolute top-0 right-0'>
                    <Edit
                        className='h-4 w-4'
                        onClick={(_) => setIsEditingProductDetails(true)}
                    />
                </Button>
                <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <Image
                        src={
                            item.productImage ||
                            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        }
                        alt={item.productName || 'placeholder'}
                        layout='fill'
                        objectFit='cover'
                        className='rounded'
                    />
                </div>
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {item.productName || 'Generic ' + item.name}
                    </h3>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <Badge variant='outline' className='bg-background'>
                            {item.productBrand || 'N/A'}
                        </Badge>
                        <Badge variant='outline'>
                            {item.productWeight?.toFixed(0) || '_'} oz
                        </Badge>
                        <Badge variant='outline'>
                            $ {item.productPrice?.toFixed(0) || '_'}
                        </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                        {item.productDescription}
                    </p>
                </div>
            </div>
        );
    }
}
