import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { usePack } from '../../usePack';
import { Button } from '@/ui/button';
import { usePackModalContext } from './PackModal';
import Link from 'next/link';
import { EarthIcon } from 'lucide-react';
import { AttributeBadge } from '@/features/attributes/AttributeBadge';

export const PackModalContent: React.FC = () => {
    const { pack, isReadOnly } = usePack();
    const { setIsEditing } = usePackModalContext();

    if (!pack) return null;

    return (
        <>
            <DialogHeader className=''>
                <div className='gap-4 items-baseline'>
                    <DialogTitle className='text-2xl font-bold text-left'>
                        {pack.name}
                    </DialogTitle>
                    <DialogDescription className='flex '>
                        {pack.isPublic && (
                            <span title='This is a publicly shared pack'>
                                <EarthIcon className='h-3 w-3 mr-1 inline-block align-center -translate-y-[2px]' />
                            </span>
                        )}
                        by {pack.userName || 'unkown'}
                    </DialogDescription>
                </div>
                <div className='flex flex-wrap gap-1 -mx-1'>
                    {Object.entries(pack.attributes).map((attr) => (
                        <AttributeBadge
                            key={attr[0]}
                            attribute={{
                                type: attr[0],
                                value: attr[1],
                            }}
                        />
                    ))}
                </div>
            </DialogHeader>
            <div>
                {pack.description}
                {!pack.description && (
                    <span className='text-muted-foreground'>
                        No description
                    </span>
                )}
            </div>
            <DialogFooter className='flex flex-row gap-2 !justify-start mt-4'>
                <Link href={`/packs/${pack.id}`}>
                    <Button>Open Pack</Button>
                </Link>
                {!isReadOnly && (
                    <Button
                        variant='outline'
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Details
                    </Button>
                )}
            </DialogFooter>
        </>
    );
};
