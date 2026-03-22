module.exports = [
"[project]/app/upload/UploadClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'sans-serif',
        backgroundColor: '#f5f5f5'
    },
    heading: {
        marginBottom: '1.5rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#1a1a1a'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '320px'
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%'
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
        cursor: 'pointer'
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
        cursor: 'pointer'
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
        cursor: 'pointer'
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
        cursor: 'pointer'
    },
    fileName: {
        fontSize: '0.875rem',
        color: '#374151',
        textAlign: 'center'
    }
};
function UploadClient({ uploadImageAction }) {
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const galleryInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(navigator.userAgent));
    }, []);
    const handleFileChange = (event)=>{
        if (event.target.files?.[0]) {
            setFile(event.target.files[0]);
        }
    };
    const handleSubmit = async ()=>{
        if (!file || isUploading) return;
        const formData = new FormData();
        formData.append('file', file);
        setIsUploading(true);
        const result = await uploadImageAction(formData);
        setIsUploading(false);
        alert(result.message);
        if (result.ok) setFile(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: styles.heading,
                children: "Upload Pictures"
            }, void 0, false, {
                fileName: "[project]/app/upload/UploadClient.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.form,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.buttonRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.galleryButton,
                                type: "button",
                                onClick: ()=>galleryInputRef.current?.click(),
                                children: "Choose from Gallery"
                            }, void 0, false, {
                                fileName: "[project]/app/upload/UploadClient.tsx",
                                lineNumber: 133,
                                columnNumber: 21
                            }, this),
                            isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.cameraButton,
                                type: "button",
                                onClick: ()=>cameraInputRef.current?.click(),
                                children: "Take Photo"
                            }, void 0, false, {
                                fileName: "[project]/app/upload/UploadClient.tsx",
                                lineNumber: 142,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/upload/UploadClient.tsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: galleryInputRef,
                        type: "file",
                        accept: "image/*",
                        onChange: handleFileChange,
                        style: {
                            display: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/upload/UploadClient.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: cameraInputRef,
                        type: "file",
                        accept: "image/*",
                        capture: "environment",
                        onChange: handleFileChange,
                        style: {
                            display: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/upload/UploadClient.tsx",
                        lineNumber: 160,
                        columnNumber: 17
                    }, this),
                    file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.fileName,
                        children: [
                            "Selected file: ",
                            file.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/upload/UploadClient.tsx",
                        lineNumber: 169,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: styles.uploadButton,
                        type: "button",
                        disabled: !file || isUploading,
                        onClick: handleSubmit,
                        children: isUploading ? 'Uploading...' : 'Upload'
                    }, void 0, false, {
                        fileName: "[project]/app/upload/UploadClient.tsx",
                        lineNumber: 171,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/upload/UploadClient.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: styles.backButton,
                onClick: ()=>router.back(),
                children: "Back to Dashboard"
            }, void 0, false, {
                fileName: "[project]/app/upload/UploadClient.tsx",
                lineNumber: 181,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/upload/UploadClient.tsx",
        lineNumber: 129,
        columnNumber: 9
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0oi00il._.js.map