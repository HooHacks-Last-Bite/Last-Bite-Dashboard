'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { UploadResult } from './actions';
import { useRouter } from 'next/navigation';

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'sans-serif',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        marginBottom: '1.5rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#1a1a1a',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '320px',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
    },
    galleryButton: {
        width: '100%',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    cameraButton: {
        width: '100%',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    uploadButton: {
        width: '100%',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    backButton: {
        marginTop: '0.5rem',
        width: '100%',
        maxWidth: '320px',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
    fileName: {
        fontSize: '0.875rem',
        color: '#374151',
        textAlign: 'center',
    },
};

type Props = {
    uploadImage: (formData: FormData) => Promise<UploadResult>;
};

export default function UploadClient({ uploadImage }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(navigator.userAgent));
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || isUploading) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        const result = await uploadImage(formData);
        setIsUploading(false);

        alert(result.message);
        if (result.ok) setFile(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Upload Pictures</h1>
            <div style={styles.form}>
                <div style={styles.buttonRow}>
                    <button
                        style={styles.galleryButton}
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                    >
                        Choose from Gallery
                    </button>

                    {isMobile && (
                        <button
                            style={styles.cameraButton}
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                        >
                            Take Photo
                        </button>
                    )}
                </div>

                <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {file && <p style={styles.fileName}>Selected file: {file.name}</p>}

                <button
                    style={styles.uploadButton}
                    type="button"
                    disabled={!file || isUploading}
                    onClick={handleSubmit}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            <button style={styles.backButton} onClick={() => router.back()}>
                Back to Dashboard
            </button>
        </div>
    );
}