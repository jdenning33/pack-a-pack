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

export const PackModalContent: React.FC = () => {
    const { pack, isReadOnly } = usePack();
    const { setIsEditing } = usePackModalContext();

    if (!pack) return null;

    return (
        <>
            <DialogHeader>
                <div>
                    <DialogTitle className='text-2xl font-bold'>
                        {pack.name}
                    </DialogTitle>
                    <DialogDescription className='flex items-center'>
                        {pack.isPublic && (
                            <span title='This is a publicly shared pack'>
                                <EarthIcon className='h-3 w-3 mr-1 inline-block align-center -translate-y-[2px]' />
                            </span>
                        )}
                        by {pack.userName || 'unkown'}
                    </DialogDescription>
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
            <DialogFooter className='flex !justify-start'>
                <Link href={`/packs/${pack.id}`}>
                    <Button>Go To Pack Page</Button>
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
