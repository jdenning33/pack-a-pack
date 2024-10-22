import { supabase } from '../supabaseClient';

export async function uploadGearImageFromUrl(imageUrl: string) {
    const bucketName = 'gear-images';
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
