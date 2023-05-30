import React, { useCallback, useRef, useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { BotpressWebChat } from "./BotpressWebChat";

const ListBots = ({ botId, cssContent, filename }) => {
  const [generatedCSSPath, setGeneratedCSSPath] = useState("");
  const [showWebChat, setShowWebChat] = useState(false);
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;


  useEffect(() => {
    const handleGenerateCSS = async () => {
      try {
        const client = new S3Client({
          region: "nyc3",
          endpoint: "https://nyc3.digitaloceanspaces.com",
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
          },
        });

        const params = {
          Bucket: "webchat-styler-css",
          Key: `css/${botId}_${filename}.css`,
          Body: cssContent,
          ContentType: "text/css",
          ACL: "public-read-write",
        };

        const command = new PutObjectCommand(params);

        const data = await client.send(command);
        console.log("CSS uploaded to DigitalOcean Spaces:", data);
        const filePath = `https://webchat-styler-css.nyc3.cdn.digitaloceanspaces.com/css/${botId}_${filename}.css`;
        console.log(`CSS generation successful: ${filePath}`);
        setGeneratedCSSPath(filePath);
        setShowWebChat(true);
      } catch (error) {
        console.log("Error generating CSS:", error);
      }
    };

    handleGenerateCSS();
  }, [botId, cssContent, filename]);

  return (
    <div>
      <div>
        <p>{generatedCSSPath}</p>
      </div>
      {showWebChat && (
        <BotpressWebChat
          botId={botId}
          cssfilepath={generatedCSSPath}
          cssContent={cssContent}
        />
      )}
    </div>
  );
};

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);
  const [rectangleColor, setRectangleColor] = useState("#8d71bc"); // Initial color of the rectangle
  const [botId, setBotId] = useState("");
  const [botRadius, setBotRadius] = useState("10px");
  const generateUniqueNumber = () => {
    return Math.floor(Math.random() * 1000000); // Generate a random number
  };

  const [filename, setFilename] = useState(() => generateUniqueNumber()); // Generate a unique number on initial render

  const close = useCallback(() => {
    toggle(false);
    console.log("Popover closed");
  }, []);

  const open = useCallback(() => {
    toggle(true);
    console.log("Popover opened");
  }, []);
  useClickOutside(popover, close);

  const handleColorChange = (newColor) => {
    setRectangleColor(newColor);
    onChange(newColor); // Notify parent component about the color change
    setFilename(generateUniqueNumber()); // Generate a new unique number when color changes
  };

  const handleBotIdChange = (event) => {
    setBotId(event.target.value);
  };

  const cssContent = `.bpw-header-container {
    background-color: ${rectangleColor};
}

.bpw-chat-bubble-content{
    background-color: ${rectangleColor};
    border-radius: ${botRadius};
}
.chat-bubble2 {
    background-color: ${rectangleColor};
}
.bpw-header-container{
  border: 1px;
  border-top-right-radius: ${botRadius};
  border-top-left-radius: ${botRadius};
}

.bpw-layout{
  width: 200px;
  border: 1px;
  border-radius: ${botRadius};
}
.bpw-header-name{
  color: black;
}

.bpw-layout{
  height: 60%;
  right: 30px;
  bottom: 50px
}

.bpw-header-container{
  color: ${rectangleColor};
}
.bpw-keyboard-single-choice{
  display: none
}
.bpw-chat-container{
  background-color: ${rectangleColor};
  overflow: hidden;
}

.bpw-composer{
  background-color: ${rectangleColor};
  border-bottom-right-radius: ${botRadius};
border-bottom-left-radius:${botRadius};
border-top: none
}

/* Styling the scrollbar for WebKit-based browsers */
.bpw-chat-container::-webkit-scrollbar {
  width: 10px;
}

.bpw-chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.bpw-chat-container::-webkit-scrollbar-thumb {
  background: ${rectangleColor};
}

/* Styling the scrollbar for Firefox */
.bpw-chat-container {
  scrollbar-width: thin;
  scrollbar-color: #ffffff ${rectangleColor};
}

.bpw-chat-container::-moz-scrollbar {
  width: 10px;
}

.bpw-chat-container::-moz-scrollbar-track {
  background: #f1f1f1;
}

.bpw-chat-container::-moz-scrollbar-thumb {
  background: ${rectangleColor};
}
`;

  return (
    <>
      <div className="picker">
        <div className="pickers">
          <div className="theme-selector">
            <div
              className="swatch"
              style={{ backgroundColor: color }}
              onClick={open}
            />
            <HexColorInput
              color={color}
              onChange={handleColorChange}
              className="color-input"
            />
            {isOpen && (
              <div className="popover" ref={popover}>
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
          <input
            type="text"
            value={botId}
            onChange={handleBotIdChange}
            placeholder="Enter Bot ID"
            style={{ width: "500px" }}
          />
        </div>
        {botId && (
          <div className="generator">
            <ListBots
              botId={botId}
              cssContent={cssContent}
              filename={filename}
            />
          </div>
        )}
      </div>
    </>
  );
};
