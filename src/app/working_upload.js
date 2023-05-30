"use client";
import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default function Working() {
  const [selectFile, setSelectFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectFile(e.target.files[0]); // Access the first file from the FileList
  };

  const handleUpload = async () => {
    const client = new S3Client({
      region: "nyc3",
      endpoint: "https://nyc3.digitaloceanspaces.com",
      credentials: {
        accessKeyId: "DO00EQVFNDFJ74E9K6LT",
        secretAccessKey: "W+w1EpMU33/fAEwWlb2R/gOHPhrnPOKNT4Y9MUPB7zY",
      },
    });

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;

      const params = {
        Bucket: "webchat-styler-css",
        Key: "css/test.css",
        Body: fileContent,
        ContentType: "text/css",
        ACL: "public-read-write",
      };

      const command = new PutObjectCommand(params);

      try {
        const data = await client.send(command);
        console.log(data);
      } catch (error) {
        console.log("Error uploading object:", error);
      }
    };

    reader.readAsText(selectFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} multiple></input>
      <button onClick={handleUpload}>Upload To S3</button>
    </div>
  );
}
