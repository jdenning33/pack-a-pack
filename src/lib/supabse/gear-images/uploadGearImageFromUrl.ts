'use server';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function uploadGearImageFromUrl(imageUrl: string) {
    const bucketName = 'gear-images';
    try {
        // Create a Supabase client specifically for server components
        const cookieStore = cookies();
        const supabase = createServerComponentClient({
            cookies: () => cookieStore,
        });

        // Use the provided image URL directly
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image');

        // Get the image blob
        const imageBlob = await response.blob();

        // Generate a unique filename
        const fileExtension = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 6);
        const fileName = `${timestamp}-${randomString}.${fileExtension}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, imageBlob, {
                contentType: imageBlob.type,
                upsert: false,
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
