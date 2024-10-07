'use client';

import { usePack } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { AddCategoryButton } from '../category/AddCategoryButton';
import { PackCategory } from '../category/PackCategory';
import { SelectedPackCategoryModal } from '../category/SelectedPackCategoryModal';

export function PackContents() {
    const { pack } = usePack();
    const { selectedCategory } = usePackNavigation();
    if (!pack) return <div>Loading...</div>;

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-lg font-bold'>{pack.name}</h1>
                <AddCategoryButton />
            </div>

            <div className='columns-[12rem] gap-6'>
                {pack.categories.map((category) => (
                    <PackCategory
                        key={category.id}
                        category={category}
                        className='break-inside-avoid'
                    />
                ))}
            </div>

            <SelectedPackCategoryModal />
        </div>
    );
}
