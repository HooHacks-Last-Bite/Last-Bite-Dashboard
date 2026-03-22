import '../../styles/photo.css'


export default function PhotoCapture() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
 
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }, []);
 
  const openCamera = async () => {
    setCameraError("");
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setCameraError("Could not access camera. Please allow camera permissions and try again.");
      setCameraOpen(false);
    }
  };
 
  const closeCamera = () => {
    stopStream();
    setCameraOpen(false);
    setCameraError("");
  };
 
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setImage(dataUrl);
    setImageName("captured-photo.jpg");
    closeCamera();
  };
 
  const chooseFile = () => fileInputRef.current?.click();
 
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
 
  const clearImage = () => {
    setImage(null);
    setImageName("");
  };
 
  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = imageName || "photo.jpg";
    a.click();
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="card">
          <div className="header">
            <div className="icon-ring">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2a7a2a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <h1 className="title">Capture a Photo</h1>
            <p className="subtitle">Snap with your camera or pick<br/>an image from your device</p>
          </div>
 
          <div className="btn-group">
            <button className="btn btn-primary" onClick={openCamera}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              Take Photo
            </button>
 
            <div className="divider">or</div>
 
            <button className="btn btn-secondary" onClick={chooseFile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Choose Photo
            </button>
          </div>
 
          {cameraError && <div className="error-msg">{cameraError}</div>}
 
          <div className={`preview-area ${image ? "has-image" : ""}`}>
            {image ? (
              <img src={image} alt="Preview" className="preview-img" />
            ) : (
              <div className="preview-placeholder">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Preview will appear here</span>
              </div>
            )}
          </div>
 
          {image && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span className="success-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {imageName}
                </span>
              </div>
              <div className="preview-actions">
                <button className="btn-ghost" onClick={downloadImage}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Save
                </button>
                <button className="btn-ghost danger" onClick={clearImage}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                  </svg>
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
 
        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <canvas ref={canvasRef} />
 
        {/* Camera Modal */}
        {cameraOpen && (
          <div className="modal-overlay" onClick={closeCamera}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                  Live Camera
                </div>
                <button className="modal-close" onClick={closeCamera}>✕</button>
              </div>
              <div className="video-wrap">
                <video ref={videoRef} playsInline muted autoPlay />
                <div className="viewfinder">
                  <div className="vf-tr" />
                  <div className="vf-bl" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="shutter-btn" onClick={capturePhoto} title="Capture photo">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}