'use client';

import { usePack } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { AddCategoryButton } from '../category/AddCategoryButton';
import { PackCategory } from '../category/PackCategory';
import { SelectedCategoryModal } from '../category/SelectedCategoryModal';

export function PackContents() {
    const { pack } = usePack();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                <AddCategoryButton />
            </div>

            <div className='columns-[10rem] gap-4 space-y-4'>
                {pack.categories.map((category) => (
                    <PackCategory
                        key={category.id}
                        category={category}
                        className='break-inside-avoid'
                    />
                ))}
            </div>

            <SelectedCategoryModal />
        </div>
    );
}
