import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Item, Product, usePack } from '../../pack/hooks/usePack';
import { ProductFormValues } from './AddProductButton';

export function EditProductForm({
    product,
    item,
    onFinished,
}: {
    product?: Product;
    item: Item;
    onFinished?: () => void;
}) {
    const { pack, addProduct, updateProduct } = usePack(); // Replace with the actual hook or function for adding a product

    const {
        register, // Register form inputs
        handleSubmit, // Handles form submission
        formState: { errors }, // Validation error state
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
        const newProduct: Product | Omit<Product, 'id'> = {
            ...product,
            itemId: item.id,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
        };
        if ('id' in newProduct) await updateProduct(newProduct as Product);
        else await addProduct(newProduct);
        onFinished?.(); // Close dialog after submission
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* Product Name */}
            <div>
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

            {/* Product Description */}
            <div>
                <Textarea
                    placeholder='Product Description (optional)'
                    {...register('description')}
                />
            </div>

            {/* Brand */}
            <div>
                <Input placeholder='Brand (optional)' {...register('brand')} />
            </div>

            {/* Image URL */}
            <div>
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

            <div className='flex'>
                {/* Weight */}
                <div className='flex-1'>
                    <div className='flex'>
                        <Input
                            type='number'
                            placeholder='Weight (grams)'
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
                        oz
                    </div>
                    {errors.weight && (
                        <p className='text-sm text-red-600'>
                            {errors.weight.message}
                        </p>
                    )}
                </div>

                {/* Price */}
                <div className='flex-1'>
                    <div className='flex'>
                        $
                        <Input
                            type='number'
                            placeholder='Price (USD)'
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
            </div>

            <Button type='submit'>
                {product ? 'Update Product' : 'Add Product'}
            </Button>
        </form>
    );
}
