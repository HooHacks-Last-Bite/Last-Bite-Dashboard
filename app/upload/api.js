const API_URL = "http://172.20.10.10:8000/upload";

/**
 * Converts a base64 data URL to a Blob.
 * @param {string} dataUrl - The base64 data URL string (e.g. from canvas or FileReader)
 * @returns {Blob}
 */
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

/**
 * Uploads a photo to the backend API as multipart/form-data.
 * @param {string} imageDataUrl - The base64 data URL of the image
 * @param {string} filename - The filename to send with the upload
 * @returns {Promise<any>} - Resolves with the parsed JSON response from the server
 */
export async function uploadPhoto(imageDataUrl, filename) {
  const blob = dataUrlToBlob(imageDataUrl);

  const formData = new FormData();
  //formData.append("photo", blob, filename);
  formData.append("file", blob, filename);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
    // No auth headers needed — add here if requirements change:
    // headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed (${response.status}): ${errorText}`);
  }

  return response.json();
}