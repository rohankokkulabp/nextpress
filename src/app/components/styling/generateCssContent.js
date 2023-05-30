const polished = require("polished");

const generateCssContent = (
  color,
  botRadius,
  bottom,
  right,
  height,
  width
) => {
  const lightColor = polished.lighten(0.2, color); // Generate a lighter variant of the color
  const darkColor = polished.darken(0.2, color);
  const botbubbleColor = polished.lighten(0.25, color);
  const userbubbleColor = polished.darken(0.25, color);
  const colorBrightness = (color) => {
    const hex = color.startsWith("#") ? color.replace("#", "") : color;
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate the brightness using the formula (0.299 * R + 0.587 * G + 0.114 * B)
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return brightness;
  };
  // Generate lighter or darker text color based on the darkness of the background color
  console.log(colorBrightness(color));
  const textColor = colorBrightness(color) > 0.6 ? "#000000" : "#ffffff";
  const textColor2 =
    colorBrightness(botbubbleColor) > 0.6 ? "#000000" : "#ffffff";

  const cssContent = `
  #input-message{
    color: ${textColor}
  }
      .bpw-header-container {
        background-color: ${darkColor};
      }
  
      .bpw-chat-bubble-content {
        background-color: ${color};
        border-radius: ${botRadius}px;
        border: 1px transparent;
      }
  
      .bpw-header-container {
        border: 1px;
        border-top-right-radius: ${botRadius}px;
        border-top-left-radius: ${botRadius}px;
      }
      .bpw-date-container{
        color: ${textColor}
      }
  
      .bpw-header-name {
        color: ${textColor};
      }
  
      .bpw-layout {
      width: ${width}px !important;
      border: 1px;
      height: ${height}%;
      border-radius: ${botRadius}px;
      right: ${right}px; /* Added right property */
      bottom: ${bottom}px; /* Added bottom property */
    }
      .bpw-header-icon, .bpw-header-icon svg, .bpw-header-icon svg path{
        fill: ${textColor} !important;
      }
  
      .bpw-header-container {
        color: ${color};
      }
  
      .bpw-keyboard-single-choice {
        display: none;
      }
  
      .bpw-chat-container {
        background-color: ${lightColor};
        overflow: hidden;
      }
      .bpw-from-bot .bpw-chat-bubble .bpw-chat-bubble-content{
        background-color: ${botbubbleColor};
        color: ${textColor2}
      }
      .bpw-from-user .bpw-chat-bubble .bpw-chat-bubble-content{
        background-color: ${userbubbleColor};
        color: ${textColor}
      }
  
      .bpw-composer {
        background-color: ${lightColor};
        border-bottom-right-radius: ${botRadius}px;
        border-bottom-left-radius: ${botRadius}px;
        border-top: none;
      }
  
      /* Styling the scrollbar for WebKit-based browsers */
      .bpw-chat-container::-webkit-scrollbar {
        width: 10px;
      }
  
      .bpw-chat-container::-webkit-scrollbar-track {
        background: ${darkColor};
      }
  
      .bpw-chat-container::-webkit-scrollbar-thumb {
        background: ${color};
      }
      .bpw-bot-avatar img, .bpw-bot-avatar svg{
        background: ${darkColor}
      }
  
      /* Styling the scrollbar for Firefox */
      .bpw-chat-container {
        scrollbar-width: thin;
        scrollbar-color: ${darkColor} ${lightColor};
        border: none
      }
  
      .bpw-chat-container::-moz-scrollbar {
        width: 10px;
      }
  
      .bpw-chat-container::-moz-scrollbar-track {
        background: #f1f1f1;
      }
  
      .bpw-chat-container::-moz-scrollbar-thumb {
        background: ${color};
      }
    `;

  return cssContent;
};

module.exports = generateCssContent;
