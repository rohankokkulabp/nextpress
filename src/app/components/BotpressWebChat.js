import React, { useState, useEffect } from "react";
import Head from "next/head";

export const BotpressWebChat = React.memo(({ botId, cssfilepath, cssContent }) => {
  console.log(cssContent);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
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
          stylesheet: cssfilepath,
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
    if (window.botpressWebChat) {
      window.botpressWebChat.configure({ stylesheet: cssfilepath });
    }
    setTimeout(() => setIsLoading(false), 10000); // Delay for 3 seconds before setting isLoading to false
  }, [cssContent, cssfilepath]);

  return (
    <>
      <Head>
        <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
      </Head>
      {isLoading ? (
        <img src="loading.gif" alt="Loading" />
      ) : (
        <div id="botpress-webchat-container"></div>
      )}
    </>
  );
});
