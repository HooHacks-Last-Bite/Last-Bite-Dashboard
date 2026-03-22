'use server';

export type UploadResult = {
    ok: boolean;
    message: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
    const file = formData.get('file');

    if (!(file instanceof File)) {
        return { ok: false, message: 'No file provided.' };
    }

    const upstream = new FormData();
    upstream.append('file', file);

    try {
        const response = await fetch(
            process.env.UPLOAD_API_URL ?? 'http://10.142.38.61:3000/upload',
            {
                method: 'POST',
                body: upstream,
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            return { ok: false, message: `Upload failed (${response.status}).` };
        }

        return { ok: true, message: 'Upload successful!' };
    } catch (error) {
        console.error('Server action upload error:', error);
        return { ok: false, message: 'Network/server error during upload.' };
    }
}