import React, { useEffect, useState, useCallback } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { throttle } from "lodash";
const BotpressWebChat = React.memo(({ botId, cssfilepath }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
      script.async = true;
      script.onload = () => {
        window.botpressWebChat.init({
          botId: botId,
          hostUrl: "https://cdn.botpress.cloud/webchat/v0",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: botId,
          disableAnimations: true,
          botName: "Works",
          stylesheet:
            "https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/b419b124-7f17-41b4-ae05-526707a1b480/b419b124-7f17-41b4-ae05-526707a1b480_838583.css",
          showPoweredBy: true,
        });
        window.botpressWebChat.onEvent(
          function () {
            window.botpressWebChat.sendEvent({ type: "show" });
          },
          ["LIFECYCLE.LOADED"]
        );
        setIsInitialized(true);
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [botId, cssfilepath, isInitialized]);

  useEffect(() => {
    console.log(cssfilepath);
    if (isInitialized && window.botpressWebChat) {
      window.botpressWebChat.mergeConfig({
        stylesheet: cssfilepath,
        showPoweredBy: true,
      });
    }
  }, [cssfilepath, isInitialized]);

  return <>{isInitialized && <div id="botpress-webchat-container"></div>}</>;
});

const UploadCSS = ({ botId, cssContent }) => {
  const [generatedCSSPath, setGeneratedCSSPath] = useState(
    `https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/${botId}/style.css`
  );
  const [showWebChat, setShowWebChat] = useState(false);

  const debounceGeneratedCSS = useCallback(
    throttle(async (botId, cssContent) => {
      try {
        const client = new S3Client({
          region: "nyc3",
          endpoint: "https://nyc3.digitaloceanspaces.com",
          credentials: {
            accessKeyId: "DO00EQVFNDFJ74E9K6LT",
            secretAccessKey: "W+w1EpMU33/fAEwWlb2R/gOHPhrnPOKNT4Y9MUPB7zY",
          },
        });

        const params = {
          Bucket: "webchat-styler-css",
          Key: `${botId}/${botId}_${filename}.css`,
          Body: cssContent,
          ContentType: "text/css",
          ACL: "public-read-write",
        };

        const command = new PutObjectCommand(params);

        const data = await client.send(command);
        console.log(data);
        const filePath = `https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/${botId}/${botId}_${filename}.css`;
        setGeneratedCSSPath(filePath);

        setShowWebChat(true);
      } catch (error) {
        // console.log("Error generating CSS:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedGenerateCSS(botId, cssContent);
  }, [botId, cssContent]);

  return (
    <div>
      <div>
        <p>{generatedCSSPath}</p>
      </div>
      {showWebChat && (
        <BotpressWebChat botId={botId} cssfilepath={generatedCSSPath} />
      )}
    </div>
  );
};

export default UploadCSS;
