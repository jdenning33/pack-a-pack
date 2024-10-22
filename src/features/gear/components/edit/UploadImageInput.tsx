import React, { useState } from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { supabase } from '@/lib/supabse/supabaseClient';
import { Controller } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Loader } from 'lucide-react';

function generateRandom4CharString() {
    return Math.random().toString(36).substring(2, 6);
}

function addRandom4CharStringToFileName(fileName: string) {
    const fileParts = fileName.split('.');
    const fileExtension = fileParts.pop();
    return [...fileParts, generateRandom4CharString(), fileExtension].join('.');
}

async function uploadImageFromUrl(
    imageUrl: string,
    bucketName: string = 'gear-images'
) {
    try {
        // Use a CORS proxy
        const corsProxyUrl =
            'https://corsproxy.io/?' + encodeURIComponent(imageUrl);

        // Fetch the image through the proxy
        const response = await fetch(corsProxyUrl);
        if (!response.ok) throw new Error('Failed to fetch image');

        // Get the image blob
        const imageBlob = await response.blob();

        // Generate a unique filename
        const fileExtension = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const randomString = Math.random().toString(36).substring(2, 6);
        const fileName = `${randomString}.${fileExtension}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, imageBlob, {
                contentType: imageBlob.type,
            });

        if (error) throw error;

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export function UploadImageInput({ className }: { className?: string }) {
    const { control } = useEditGearForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <div className={cn('min-w-20 space-y-2', className)}>
            <Controller
                name='image'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <div className='space-y-2'>
                        <Input
                            placeholder='Image URL (optional)'
                            type='text'
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                            }}
                            value={imageUrl || ''}
                        />
                        <Button
                            type='button'
                            onClick={async () => {
                                if (!imageUrl) return;
                                setIsLoading(true);
                                setError(null);
                                try {
                                    const newUrl = await uploadImageFromUrl(
                                        imageUrl
                                    );
                                    onChange(newUrl);
                                } catch (err) {
                                    setError(
                                        'Failed to upload image. Please try a different URL.'
                                    );
                                    console.error(err);
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                            disabled={isLoading || !imageUrl}
                            className='w-full'
                        >
                            {isLoading ? (
                                <>
                                    <Loader className='w-4 h-4 mr-2 animate-spin' />
                                    Uploading...
                                </>
                            ) : (
                                'Upload Image'
                            )}
                        </Button>
                        {error && (
                            <p className='text-sm text-red-500'>{error}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
}
