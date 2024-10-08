import React from 'react';
import { Category } from '../../hooks/usePack';

export function CategoryOverviewPanel({ category }: { category: Category }) {
    return (
        <div className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>
                {category.items.length} items in this category
            </p>
            <hr />
            <div>Common "{category.name}" Items</div>
        </div>
    );
}
