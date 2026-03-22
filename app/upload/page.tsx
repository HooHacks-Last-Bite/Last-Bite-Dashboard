"use client";

import { Header } from "@/components/dashboard/header";
import PhotoCapture from "./photocaputre";

export default function UploadPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <main className="flex min-h-[calc(100vh-89px)] w-full items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-3xl">
          <PhotoCapture />
        </div>
      </main>
    </div>
  );
}