import React, { useState } from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Loader } from 'lucide-react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';

export function GearUploadImageFromUrlInput({
    className,
}: {
    className?: string;
}) {
    const { control } = useEditGearForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { uploadGearImageFromUrl } = useAppMutations();
    const [uploadFromUrl, setUploadFromUrl] = useState(false);

    if (!uploadFromUrl) {
        return (
            <Button
                variant='link'
                className='p-0'
                onClick={() => setUploadFromUrl(true)}
            >
                Upload Gear Image from Web URL
            </Button>
        );
    }

    return (
        <div className={cn('min-w-20 max-w-sm space-y-1', className)}>
            <Controller
                name='image'
                control={control}
                render={({ field: { onChange } }) => (
                    <div className='flex items-center'>
                        <Input
                            className='rounded-r-none'
                            placeholder='Image URL (optional)'
                            type='text'
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                            }}
                            value={imageUrl || ''}
                        />
                        <Button
                            type='button'
                            variant='outline'
                            onClick={async () => {
                                if (!imageUrl) return;
                                setIsLoading(true);
                                setError(null);
                                try {
                                    const newUrl = await uploadGearImageFromUrl(
                                        imageUrl
                                    );
                                    onChange(newUrl);
                                    setImageUrl(null);
                                    setUploadFromUrl(false);
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
                            className='rounded-l-none'
                        >
                            {isLoading ? (
                                <>
                                    <Loader className='w-4 h-4 mr-2 animate-spin' />
                                    Uploading...
                                </>
                            ) : (
                                'Upload'
                            )}
                        </Button>
                    </div>
                )}
            />
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    );
}
