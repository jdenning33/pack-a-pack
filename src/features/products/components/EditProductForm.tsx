import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Gear, useProducts } from '../useProducts';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/ui/image-with-fallback';

export interface ProductFormValues {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
}

export function EditProductForm({
    product,
    onFinished,
}: {
    product?: Gear;
    onFinished?: () => void;
}) {
    const { addProduct, updateProduct } = useProducts();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            image: '',
            weight: 0,
            price: 0,
            ...product,
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        const newProduct = {
            ...product,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
        };
        if (newProduct.id) await updateProduct(newProduct as Gear);
        else await addProduct(newProduct as Omit<Gear, 'id'>);
        onFinished?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex gap-4'>
                <ProductImage />
                <div className='space-y-4 flex-grow'>
                    <ProductNameInput />
                    <div className='flex gap-4'>
                        <ProductBrandInput className='basis-1/3' />
                        <ProductWeightInput className='basis-1/3' />
                        <ProductPriceInput className='basis-1/3' />
                    </div>
                </div>
            </div>
            <ProductDescriptionInput />
            <ProductImageUrlInput />

            <div className='flex gap-2'>
                <Button type='submit'>
                    {product ? 'Update Product' : 'Add Product'}
                </Button>
                <Button
                    variant='ghost'
                    type='button'
                    onClick={() => onFinished?.()}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );

    function ProductImage() {
        const productImage = useWatch({
            control: control,
            name: 'image',
        });

        return (
            <div className='relative w-24 h-24 rounded-lg flex-shrink-0'>
                <ImageWithFallback
                    src={productImage || ''}
                    fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt={product?.name || 'placeholder'}
                    layout='fill'
                    objectFit='contain'
                    className='rounded w-full h-full'
                />
            </div>
        );
    }

    function ProductNameInput({ className }: { className?: string }) {
        return (
            <div className={cn(className)}>
                <Input
                    placeholder='Product Name'
                    {...register('name', {
                        required: 'Product name is required',
                    })}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className='text-sm text-red-600'>
                        {errors.name.message}
                    </p>
                )}
            </div>
        );
    }

    function ProductWeightInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <div className='flex items-center gap-1'>
                    <Input
                        type='number'
                        placeholder='Weight'
                        {...register('weight', {
                            required: 'Weight is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Weight must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.weight}
                    />
                    <span className='text-sm font-semibold text-primary/70'>
                        oz
                    </span>
                </div>
                {errors.weight && (
                    <p className='text-sm text-red-600'>
                        {errors.weight.message}
                    </p>
                )}
            </div>
        );
    }

    function ProductPriceInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <div className='flex items-center gap-1'>
                    <span className='text-sm font-semibold text-primary/70'>
                        $
                    </span>
                    <Input
                        type='number'
                        placeholder='Price'
                        {...register('price', {
                            required: 'Price is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Price must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.price}
                    />
                </div>
                {errors.price && (
                    <p className='text-sm text-red-600'>
                        {errors.price.message}
                    </p>
                )}
            </div>
        );
    }

    function ProductDescriptionInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Textarea
                    placeholder='Description (optional)'
                    {...register('description')}
                />
            </div>
        );
    }

    function ProductImageUrlInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input
                    placeholder='Image URL (optional)'
                    {...register('image', {
                        pattern: {
                            value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                            message: 'Invalid image URL',
                        },
                    })}
                    aria-invalid={!!errors.image}
                />
                {errors.image && (
                    <p className='text-sm text-red-600'>
                        {errors.image.message}
                    </p>
                )}
            </div>
        );
    }

    function ProductBrandInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input placeholder='Brand (optional)' {...register('brand')} />
            </div>
        );
    }
}
