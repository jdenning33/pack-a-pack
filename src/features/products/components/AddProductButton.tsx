import { useState } from 'react';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { EditProductForm } from './EditProductForm';

// Define the type for form inputs

export function AddProductButton({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className={className}>
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
                <EditProductForm onFinished={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
