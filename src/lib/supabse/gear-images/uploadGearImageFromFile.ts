import { createClient } from '@/lib/supabse/supabaseClient';

export async function uploadGearImageFromFile(file: File) {
    const fileParts = file.name.split('.');
    const randomString = Math.random().toString(36).substring(2, 6);
    const fileExtension = fileParts.pop();
    const uploadFileName = [...fileParts, randomString, fileExtension].join(
        '.'
    );
    const supabase = createClient();

    const { data, error } = await supabase.storage
        .from('gear-images')
        .upload(uploadFileName, file);

    if (error) {
        console.log(error);
        throw error;
    } else {
        const { data: publicUrlData } = supabase.storage
            .from('gear-images')
            .getPublicUrl(data.path);

        return publicUrlData.publicUrl;
    }
}
