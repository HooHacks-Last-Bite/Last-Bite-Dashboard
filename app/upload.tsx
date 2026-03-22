import React, { useState } from 'react';
import './upload.css';

const UploadPage = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('YOUR_BACKEND_API_URL', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Upload successful!');
            } else {
                alert('Upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload Pictures</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <button onClick={() => window.history.back()}>Back to Dashboard</button>
        </div>
    );
};

export default UploadPage;
