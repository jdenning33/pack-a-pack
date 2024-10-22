import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { supabase } from '@/lib/supabse/supabaseClient';
import { Controller } from 'react-hook-form';

function generateRandom4CharString() {
    return Math.random().toString(36).substring(2, 6);
}
function addRandom4CharStringToFileName(fileName: string) {
    const fileParts = fileName.split('.');
    const fileExtension = fileParts.pop();
    return [...fileParts, generateRandom4CharString(), fileExtension].join('.');
}

export function UploadImageInputWithDownload({
    className,
}: {
    className?: string;
}) {
    const { register, control } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <Controller
                name='image'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder='Brand (optional)'
                        type='file'
                        // {...register('image')}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            console.log('file', file);
                            if (!file) return;
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
                                console.log(data);
                                const { data: publicUrlData } = supabase.storage
                                    .from('gear-images')
                                    .getPublicUrl(data.path);
                                console.log(data);

                                onChange(publicUrlData.publicUrl);
                            }
                        }}
                    />
                )}
            />
        </div>
    );
}
