import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { useGearContext } from '../useGearContext';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { useAuth } from '@/features/auth/useAuth';
import { BadgeCheckIcon, EarthIcon } from 'lucide-react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useGearModal } from './GearModal';
import { useFormatWeight } from '@/lib/utils';

export const GearModalContent: React.FC = () => {
    const { user } = useAuth();
    const { gear } = useGearContext();
    const formatWeight = useFormatWeight();
    const { setIsEditing } = useGearModal();
    const { addGearToUser, removeGearFromUser } = useAppMutations();
    if (!gear) return null;

    return (
        <>
            <DialogHeader>
                <div className='w-full max-w-md flex gap-4'>
                    {/* gear image */}
                    <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                        <ImageWithFallback
                            src={gear.image || ''}
                            fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                            alt={gear.name || 'placeholder'}
                            fill={true}
                            sizes='100% 100%'
                            className='rounded object-contain object-top'
                        />
                    </div>
                    <div>
                        <DialogTitle className='leading-tight mb-2'>
                            {gear.name}
                        </DialogTitle>

                        <div className='flex flex-wrap gap-2 mb-2 items-center'>
                            {gear.isPublic && (
                                <span title='Public Gear'>
                                    <EarthIcon
                                        className='h-4 w-4 -translate-y-[1px] opacity-80'
                                        strokeWidth={1.5}
                                    />
                                </span>
                            )}
                            {gear.isOwnedByUser && (
                                <span title='Your Gear'>
                                    <BadgeCheckIcon
                                        className='h-4 w-4 scale-105 -translate-y-[1px] opacity-80'
                                        strokeWidth={1.5}
                                    />
                                </span>
                            )}
                            <Badge variant='outline' className='bg-background'>
                                {gear.brand}
                            </Badge>
                            <Badge variant='outline'>
                                {formatWeight(gear.weight)}
                            </Badge>
                            <Badge variant='outline'>
                                $ {gear.price?.toFixed(0) || '_'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </DialogHeader>
            <DialogDescription className=''>
                {gear.description}
                <br />
                {gear.isPublic && (
                    <span>
                        <br />
                        {gear.isPublic && (
                            <span
                                title='Public product'
                                className='inline-block align-text-bottom mr-1'
                            >
                                <EarthIcon
                                    className='h-4 w-4 -translate-y-[1px] opacity-80'
                                    strokeWidth={1.5}
                                />
                            </span>
                        )}
                        Public gear. <br />
                        Contributed by {gear.createdByUserName}
                    </span>
                )}
            </DialogDescription>
            {user && !gear.isOwnedByUser && (
                <DialogFooter className='mt-4 !justify-start'>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button
                        variant='outline'
                        onClick={() => addGearToUser(gear.id)}
                    >
                        Add To My Gear
                    </Button>
                </DialogFooter>
            )}
            {user && gear.isOwnedByUser && (
                <DialogFooter className='mt-4 !justify-start'>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button
                        variant='outline'
                        onClick={() => removeGearFromUser(gear.id)}
                    >
                        Remove From My Gear
                    </Button>
                </DialogFooter>
            )}
        </>
    );
};
