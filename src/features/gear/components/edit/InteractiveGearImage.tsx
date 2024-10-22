import React, { useRef, useState } from 'react';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { supabase } from '@/lib/supabse/supabaseClient';
import { ImagePlusIcon, Loader } from 'lucide-react';
import { Input } from '@/ui/input';

export function InteractiveGearImage() {
    const { control, gear } = useEditGearForm();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Controller
            name='image'
            control={control}
            render={({ field: { onChange, value } }) => (
                <div
                    className='relative w-24 h-24 rounded-lg flex-shrink-0 cursor-pointer group'
                    onClick={() => !isLoading && fileInputRef.current?.click()}
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

                            setIsLoading(true);
                            try {
                                const { data, error } = await supabase.storage
                                    .from('gear-images')
                                    .upload(
                                        `${addRandom4CharStringToFileName(
                                            file.name
                                        )}`,
                                        file
                                    );

                                if (error) {
                                    console.log(error);
                                } else {
                                    const { data: publicUrlData } =
                                        supabase.storage
                                            .from('gear-images')
                                            .getPublicUrl(data.path);

                                    onChange(publicUrlData.publicUrl);
                                }
                            } finally {
                                setTimeout(() => setIsLoading(false), 500);
                            }
                        }}
                    />
                </div>
            )}
        />
    );
}

function generateRandom4CharString() {
    return Math.random().toString(36).substring(2, 6);
}

export function addRandom4CharStringToFileName(fileName: string) {
    const fileParts = fileName.split('.');
    const fileExtension = fileParts.pop();
    return [...fileParts, generateRandom4CharString(), fileExtension].join('.');
}
