'use client';
import { KitProvider } from '@/features/kit/KitProvider';
import { usePack } from '../usePack';
import { KitCard } from '@/features/kit/components/card/KitCard';
import {
    KitModal,
    KitModalTrigger,
} from '@/features/kit/components/modal/KitModal';
import {
    DeleteKitOption,
    KitQuickOptionsMenuButton,
} from '@/features/kit/components/card/KitQuickOptionsMenuButton';
import {
    KitOpenEditModalOption,
    KitOpenModalOption,
} from '@/features/kit/components/modal/KitOpenModalOption';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function PackKitsGrid({ className }: { className?: string }) {
    const { pack, isReadOnly } = usePack();

    if (!pack) return null;
    return (
        <div
            className={cn(
                'grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]',
                className
            )}
        >
            {pack.kits.map((kit) => (
                <KitProvider
                    key={kit.id}
                    packId={kit.packId}
                    isReadOnly={isReadOnly}
                    kit={kit}
                    className='h-full'
                    style={{
                        gridRow: `span ${kit.items.length + 3}`,
                    }}
                >
                    <KitModal>
                        <KitModalTrigger className='h-full'>
                            <KitCard className='h-full'>
                                <KitQuickOptionsMenuButton>
                                    <KitOpenModalOption />
                                    <KitOpenEditModalOption />
                                    <DropdownMenuSeparator />
                                    <DeleteKitOption />
                                </KitQuickOptionsMenuButton>
                            </KitCard>
                        </KitModalTrigger>
                    </KitModal>
                </KitProvider>
            ))}
        </div>
    );
}
