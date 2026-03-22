const API_URL = process.env.NEXT_PUBLIC_UPLOAD_API_URL || "http://172.20.10.3:3000/upload";

/**
 * Converts a base64 data URL to a Blob.
 * @param {string} dataUrl
 * @returns {Blob}
 */
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
}

/**
 * Uploads a photo to backend API as multipart/form-data.
 * @param {string} imageDataUrl
 * @param {string} filename
 */
export async function uploadPhoto(imageDataUrl, filename) {
  const blob = dataUrlToBlob(imageDataUrl);
  const formData = new FormData();

  formData.append("photo", blob, filename || "photo.jpg");

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed (${response.status}): ${errorText}`);
  }

  return response.json();
}
