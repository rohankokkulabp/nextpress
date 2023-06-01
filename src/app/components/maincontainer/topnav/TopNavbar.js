import React from "react";

export const TopNavbar = ({ handlePublish, botId, generatedCSSPath }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
      <div className="flex items-center">
        <h1 className="text-gray-100 text-center">
          Webchat Styler 🎨
        </h1>
        {generatedCSSPath && (
          <p className="text-gray-100 ml-4">{generatedCSSPath}</p>
        )}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
};
