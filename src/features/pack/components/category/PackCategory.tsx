import React from 'react';
import { Checkbox } from '@/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { cn } from '@/lib/utils';
import { Category, usePack, PackItem } from '../../hooks/usePack';
import { usePackNavigation } from '../../hooks/usePackNavigation';

interface PackCategoryProps {
    category: Category;
    className?: string;
}

export const PackCategory: React.FC<PackCategoryProps> = ({
    category,
    className,
}) => {
    const { updateItem } = usePack();
    const { setSelectedCategoryId, setSelectedItemId } = usePackNavigation();

    const toggleItem = async (item: PackItem) => {
        await updateItem({
            ...item,
            isPacked: !item.isPacked,
        });
    };

    return (
        <Card
            className={cn(
                'hover:shadow-lg hover:scale-[101%] transition-all',
                className
            )}
            onClick={(e) => setSelectedCategoryId(category.id)}
        >
            <CardHeader>
                <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {category.items.length === 0 ? (
                    <p className='text-muted-foreground'>
                        No items in this category yet.
                    </p>
                ) : (
                    <ul className='space-y-2'>
                        {category.items.map((item) => (
                            <li
                                key={item.id}
                                className='flex items-center space-x-2 w-fit'
                            >
                                <Checkbox
                                    id={`item-${item.id}`}
                                    checked={item.isPacked}
                                    onCheckedChange={(e) => toggleItem(item)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />
                                <label
                                    htmlFor={`item-${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCategoryId(category.id);
                                        setSelectedItemId(item.id);
                                    }}
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:cursor-pointer'
                                >
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};
