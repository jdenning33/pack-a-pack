import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { Item, Product, usePack } from '../../hooks/usePack';

// Define the type for form inputs
interface ProductFormValues {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
}

export function AddProductButton({ item }: { item: Item }) {
    const [isOpen, setIsOpen] = useState(false);
    const { pack, addProduct } = usePack(); // Replace with the actual hook or function for adding a product

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
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        const newProduct: Omit<Product, 'id'> = {
            itemId: item.id,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
        };
        await addProduct(newProduct); // Add product through your hook
        setIsOpen(false); // Close dialog after submission
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm'>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Provide details for the new product.
                    </DialogDescription>
                </DialogHeader>
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
                        <Input
                            placeholder='Brand (optional)'
                            {...register('brand')}
                        />
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

                    {/* Weight */}
                    <div>
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
                        {errors.weight && (
                            <p className='text-sm text-red-600'>
                                {errors.weight.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
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
                        {errors.price && (
                            <p className='text-sm text-red-600'>
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <Button type='submit'>Add Product</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
