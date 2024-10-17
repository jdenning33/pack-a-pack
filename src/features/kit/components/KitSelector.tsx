import { useKitContext } from '@/features/kit/useKitContext';

export const KitSelector = ({
    children,
    onSelected,
}: {
    children: React.ReactNode;
    onSelected: (kitId: string) => void;
}) => {
    const { kit } = useKitContext();

    if (!kit) return children;
    return (
        <div className='cursor-pointer' onClick={(_) => onSelected(kit?.id)}>
            {children}
        </div>
    );
};
