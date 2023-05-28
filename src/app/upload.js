import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "https://nyc3.cdn.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "nyc3",
  credentials: {
    accessKeyId: "DO00PLRADB2YNLQFNHBR",
    secretAccessKey: "7kYb0ymUI+DmzgFWFYsP8viMX6OUTAWdc9PtGCi4heU",
  },
});

export const uploadObject = async () => {
  const params = {
    Bucket: "webchat-styler-css",
    Key: "./hello-world.txt",
    Body: "Hello, World!",
    ACL: "public-read-write",
    Metadata: {
      "x-amz-meta-my-key": "your-value",
    },
    ContentType: "text/plain",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " + params.Bucket + "/" + params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
