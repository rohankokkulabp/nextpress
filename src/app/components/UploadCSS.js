import React, { useEffect, useState, useCallback } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import generateCssContent from "./styling/generateCssContent";
import { BotpressWebChat } from "./BotpressWebChat";

import { throttle } from "lodash"

const UploadCSS = ({ botId, color, botRadius, bottom, right,height,width, filename }) => {
  const [generatedCSSPath, setGeneratedCSSPath] = useState("");
  const [showWebChat, setShowWebChat] = useState(false);


  const debouncedGenerateCSS = useCallback(
    throttle(async (color, botRadius, bottom, right, height, width) => {
    // if merge config is loading, wait to execute
    // if merge config is complete, execute
      


      try {
        const client = new S3Client({
          region: "nyc3",
          endpoint: "https://nyc3.digitaloceanspaces.com",
          credentials: {
            accessKeyId: "DO00EQVFNDFJ74E9K6LT",
            secretAccessKey: "W+w1EpMU33/fAEwWlb2R/gOHPhrnPOKNT4Y9MUPB7zY",
          },
        });

        const cssContent = generateCssContent(color, botRadius, bottom, right, height, width);

        const fileName = 'jesse_test.css'

        const params = {
          Bucket: "webchat-styler-css",
          Key: fileName,
          Body: cssContent,
          ContentType: "text/css",
          ACL: "public-read-write",
        };

        const command = new PutObjectCommand(params);

        const data = await client.send(command);
        // UPON SUCCESS, SET STATE TO LOADING MERGE CONFIG COMPLETE

        console.log("CSS uploaded to DigitalOcean Spaces:", data);
        const filePath = `https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/${fileName}?time=${Date.now()}`;
        console.log(`CSS generation successful: ${filePath}`);
        setGeneratedCSSPath(filePath);

        setShowWebChat(true);
      } catch (error) {
        console.log("Error generating CSS:", error);
      }
    }, 500), [])

  useEffect(() => {
    debouncedGenerateCSS(color, botRadius, bottom, right, height, width);
  }, [botId, color, botRadius, bottom, right, height,width, filename]);

  return (
    <div>
      <div>
        <p>{generatedCSSPath}</p>
      </div>
      {showWebChat && (
        <BotpressWebChat
          botId={botId}
          cssfilepath={generatedCSSPath}
        />
      )}
    </div>
  );
};

export default UploadCSS;
