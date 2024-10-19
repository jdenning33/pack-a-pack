'use client';
import { KitProvider } from '@/features/kit/KitProvider';
import { usePack } from '../../pack/usePack';
import { KitModal } from '@/features/kit/components/modal/KitModal';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';

export function StandardAddKitButton() {
    const { pack, isReadOnly } = usePack();
    const [editKitId, setEditKitId] = useState<string | null>(null);
    const editKit = pack?.kits.find((kit) => kit.id === editKitId);

    if (!pack) return null;
    return (
        <div>
            {editKitId && (
                <KitProvider
                    packId={pack.id}
                    isReadOnly={isReadOnly}
                    kit={editKit}
                    afterKitUpdated={(kit) => setEditKitId(kit.id)}
                >
                    <KitModal
                        isOpen={true}
                        onIsOpenChange={(open) => !open && setEditKitId(null)}
                    />
                </KitProvider>
            )}
            <Button
                onClick={() => setEditKitId('new')}
                variant='outline'
                size='sm'
                disabled={isReadOnly}
                disabledTitle='You cannot edit this pack'
            >
                <Plus className='mr-2 h-4 w-4' /> Add New Kit
            </Button>
        </div>
    );
}
