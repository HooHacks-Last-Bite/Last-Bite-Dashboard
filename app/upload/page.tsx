'use server';

import React from 'react';
import UploadClient from './UploadClient';
import { uploadImageAction } from './actions';

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
        backgroundColor: '#16a34a', // green
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
        backgroundColor: '#16a34a', // green
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
        backgroundColor: '#16a34a', // green
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
        backgroundColor: '#16a34a', // green
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

export default async function UploadPage() {
    return <UploadClient uploadImage={uploadImageAction} />;
}