import React, { useRef, useState } from 'react';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { ImagePlusIcon, Loader } from 'lucide-react';
import { Input } from '@/ui/input';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { toast } from 'sonner';
import { Button } from '@/ui/button';

export function GearInteractiveImage() {
    const { control, gear } = useEditGearForm();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadGearImageFromFile } = useAppMutations();

    return (
        <Controller
            name='image'
            control={control}
            render={({ field: { onChange, value } }) => (
                <div className='flex flex-col items-center'>
                    <div
                        className='relative w-24 h-24 rounded-lg flex-shrink-0 cursor-pointer group'
                        onClick={() =>
                            !isLoading && fileInputRef.current?.click()
                        }
                    >
                        <ImageWithFallback
                            src={value || ''}
                            fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                            alt={gear?.name || 'placeholder'}
                            fill={true}
                            sizes='100% 100%'
                            className='rounded w-full h-full object-cover'
                        />

                        {/* Overlay with camera icon or loading spinner */}
                        <div
                            className={`absolute inset-0 bg-black/50 flex items-center justify-center rounded transition-opacity 
                            opacity-0 group-hover:opacity-100 '
                        `}
                        >
                            {isLoading ? (
                                <Loader className='w-8 h-8 text-white animate-spin' />
                            ) : (
                                <ImagePlusIcon className='w-8 h-8 text-white' />
                            )}
                        </div>

                        {/* Hidden file input */}
                        <Input
                            ref={fileInputRef}
                            type='file'
                            className='hidden'
                            accept='image/*'
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                try {
                                    setIsLoading(true);
                                    const publicUrl =
                                        await uploadGearImageFromFile(file);
                                    onChange(publicUrl);
                                } catch (err) {
                                    console.error(err);
                                    toast.error('Failed to upload image');
                                } finally {
                                    setTimeout(() => setIsLoading(false), 1000);
                                }
                            }}
                        />
                    </div>
                    <Button
                        type='button'
                        variant='link'
                        size='sm'
                        onClick={() =>
                            !isLoading && fileInputRef.current?.click()
                        }
                    >
                        Change Image
                    </Button>
                </div>
            )}
        />
    );
}
