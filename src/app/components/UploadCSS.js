import React, { useEffect, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import generateCssContent from "./styling/generateCssContent";
import { BotpressWebChat } from "./BotpressWebChat";

const UploadCSS = ({ botId, color, botRadius, filename }) => {
  const [generatedCSSPath, setGeneratedCSSPath] = useState("");
  const [showWebChat, setShowWebChat] = useState(false);

  useEffect(() => {
    const handleGenerateCSS = async () => {
      try {
        const client = new S3Client({
          region: "nyc3",
          endpoint: "https://nyc3.digitaloceanspaces.com",
          credentials: {
            accessKeyId:"DO00EQVFNDFJ74E9K6LT",
            secretAccessKey: "W+w1EpMU33/fAEwWlb2R/gOHPhrnPOKNT4Y9MUPB7zY"
          },
        });

        const cssContent = generateCssContent(color, botRadius);

        const params = {
          Bucket: "webchat-styler-css",
          Key: `${botId}/${botId}_${filename}.css`,
          Body: cssContent,
          ContentType: "text/css",
          ACL: "public-read-write",
        };

        const command = new PutObjectCommand(params);

        const data = await client.send(command);
        console.log("CSS uploaded to DigitalOcean Spaces:", data);
        const filePath = `https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/${botId}/${botId}_${filename}.css`;
        console.log(`CSS generation successful: ${filePath}`);
        setGeneratedCSSPath(filePath);
        
        setShowWebChat(true);
      } catch (error) {
        console.log("Error generating CSS:", error);
      }
    };

    handleGenerateCSS();
  }, [botId, color, botRadius, filename]);

  return (
    <div>
      <div>
        <p>{generatedCSSPath}</p>
      </div>
      {showWebChat && (
        <BotpressWebChat
          botId={botId}
          cssfilepath={generatedCSSPath}
          cssContent={generateCssContent(color, botRadius)}
        />
      )}
    </div>
  );
};

export default UploadCSS;
