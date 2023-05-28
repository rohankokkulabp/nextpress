"use client";
import Image from "next/image";
import { FileUpload } from "primereact/fileupload";
import "primeicons/primeicons.css";

import { uploadObject } from "./upload";
export default function Home() {
  const handleUpload = async () => {
    await uploadObject();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="card">
          <button onClick={handleUpload}>Upload Object</button>
        </div>
      </div>
    </main>
  );
}
