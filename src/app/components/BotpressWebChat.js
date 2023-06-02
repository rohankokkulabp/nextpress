import React, { useState, useEffect } from "react";
import Head from "next/head";

export const BotpressWebChat = React.memo(
  ({ botId, cssfilepath }) => {
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
            botName: "My Chatbot",
            stylesheet: cssfilepath,
          });
          window.botpressWebChat.onEvent(
            function (event) {
              if (event.type === "LIFECYCLE.LOADED") {
                window.botpressWebChat.sendEvent({ type: "show" });
              }else if (event.type === 'CONFIG.SET') {
                // SET MERGE CONFIG COMPLETE
                console.log('config completed!')
              }
            },
            [ "LIFECYCLE.LOADED", "CONFIG.SET"]
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
        // SET STATE TO LOADING MERGE CONFIG
        window.botpressWebChat.mergeConfig({ stylesheet: cssfilepath });
      }
    }, [cssfilepath]);

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
