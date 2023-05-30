import React, { useState, useEffect } from "react";
import Head from "next/head";

export const BotpressWebChat = React.memo(
  ({ botId, cssfilepath, cssContent }) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
      console.log(window.botpressWebChat);
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
          console.log("BotpressWebChat unmounted");
          document.body.removeChild(script);
        };
      }
    }, [botId, cssfilepath, isInitialized]);

    useEffect(() => {
        if (window.botpressWebChat) {
          
        window.botpressWebChat.mergeConfig({ stylesheet: cssfilepath });
      }
    }, [cssContent, cssfilepath]);

    return (
      <>
        <Head>
          <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
        </Head>
        {isInitialized && <div id="botpress-webchat-container"></div>}
      </>
    );
  }
);
