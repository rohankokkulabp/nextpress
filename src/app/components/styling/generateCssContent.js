const polished = require("polished");

const generateCssContent = (color, botRadius, bottom, right, height, width) => {
  const lightColor = polished.lighten(0.2, color); // Generate a lighter variant of the color
  const darkColor = polished.darken(0.2, color);
  const botbubbleColor = polished.lighten(0.25, color);
  const bottomColor = polished.lighten(0.1, color);
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
  //console.log(colorBrightness(color));
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

      .bpw-powered {
        text-align: center;
        border: none;
        padding: 10px;
        color: ${textColor};
        background: linear-gradient(to bottom, ${lightColor}, ${bottomColor});
        font-size: 16px
      }

      .bpw-powered a {
        color: ${textColor};
        text-decoration: none;
      }
      
      .bpw-powered a:hover {
        text-decoration: underline;
      }
      
.bpw-send-button:disabled,
.bpw-send-button:disabled:hover {
  opacity: 0.4;
  background-color: var(--theme-primary);
  cursor: default;
}

.bpw-send-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bpw-send-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--spacing-medium);
  background-color: var(--theme-primary);
  padding: 20px;
  width: 24px;
  height: 24px;
  color: transparent;
  cursor: pointer;
  background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2217%22%20height%3D%2220%22%20viewBox%3D%220%200%2017%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.77152%201.04207L15.5347%209.13807C16.192%209.52472%2016.192%2010.4753%2015.5347%2010.8619L8.5%2015L1.70485%2018.9971C0.998111%2019.4129%200.118918%2018.8481%200.203121%2018.0325L0.811331%2012.1412C0.85993%2011.6705%201.23186%2011.2983%201.70256%2011.2493L8.21533%2010.5717C9.32302%2010.4565%209.44138%208.88961%208.36357%208.60928L1.54478%206.83574C1.15164%206.73349%200.859426%206.40357%200.805392%206.00096L0.27339%202.03702C0.162447%201.21039%201.05263%200.619195%201.77152%201.04207Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A') !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  transition: background-color 0.2s;
}

.bpw-send-button:not(:disabled):hover {
  background-color: var(--theme-primary-hover);
}
    `;

  return cssContent;
};

module.exports = generateCssContent;
