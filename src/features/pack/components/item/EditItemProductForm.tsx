import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { PackItem, usePack } from '../../hooks/usePack';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ItemProductFormValues {
    productName: string;
    productDescription?: string;
    productBrand?: string;
    productImage?: string;
    productWeight?: number;
    productPrice?: number;
}

export function EditItemProductForm({
    item,
    onFinished,
}: {
    item: PackItem;
    onFinished?: () => void;
}) {
    const { updateItem } = usePack(); // Replace with the actual hook or function for adding a product

    const {
        watch,
        register, // Register form inputs
        handleSubmit, // Handles form submission
        formState: { errors }, // Validation error state
    } = useForm<ItemProductFormValues>({
        defaultValues: {
            productName: '',
            productDescription: '',
            productBrand: '',
            productImage: '',
            productWeight: 0,
            productPrice: 0,
            ...item,
        },
    });
    const onSubmit = async (data: ItemProductFormValues) => {
        const updatedItem: PackItem = {
            ...item,
            productName: data.productName,
            productDescription: data.productDescription,
            productBrand: data.productBrand,
            productImage: data.productImage,
            productWeight: data.productWeight,
            productPrice: data.productPrice,
        };
        console.log('updated item', updatedItem);
        await updateItem(updatedItem);
        onFinished?.(); // Close dialog after submission
    };
    // get the form url from the item
    const productImage = watch('productImage');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex gap-4'>
                <ProductImage />
                <div className='space-y-4'>
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

            <Button type='submit'>Save</Button>
            <Button
                variant='ghost'
                type='button'
                onClick={(e) => onFinished?.()}
            >
                Cancel
            </Button>
        </form>
    );

    function ProductImage() {
        return (
            <div className='relative w-24 h-24 rounded-lg flex-shrink-0'>
                <Image
                    src={
                        productImage ||
                        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    }
                    alt={item.productName || 'placeholder'}
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
                    placeholder='Gear Name'
                    {...register('productName', {
                        required: 'Gear name is required',
                    })}
                    aria-invalid={!!errors.productName}
                />
                {errors.productName && (
                    <p className='text-sm text-red-600'>
                        {errors.productName.message}
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
                        placeholder='Weight (grams)'
                        {...register('productWeight', {
                            required: 'Weight is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Weight must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.productWeight}
                    />
                    <span className='text-sm font-semibold text-primary/70'>
                        oz
                    </span>
                </div>
                {errors.productWeight && (
                    <p className='text-sm text-red-600'>
                        {errors.productWeight.message}
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
                        placeholder='Price (USD)'
                        {...register('productPrice', {
                            required: 'Price is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Price must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.productPrice}
                    />
                </div>
                {errors.productPrice && (
                    <p className='text-sm text-red-600'>
                        {errors.productPrice.message}
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
                    {...register('productDescription')}
                />
            </div>
        );
    }

    function ProductImageUrlInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input
                    placeholder='Image URL (optional)'
                    {...register('productImage', {
                        pattern: {
                            value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                            message: 'Invalid image URL',
                        },
                    })}
                    aria-invalid={!!errors.productImage}
                />
                {errors.productImage && (
                    <p className='text-sm text-red-600'>
                        {errors.productImage.message}
                    </p>
                )}
            </div>
        );
    }

    function ProductBrandInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input
                    placeholder='Brand (optional)'
                    {...register('productBrand')}
                />
            </div>
        );
    }
}
