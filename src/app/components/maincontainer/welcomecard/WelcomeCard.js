import React, { useState } from "react";

export const WelcomeCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleGetStarted = () => {
    if (isChecked) {
      setButtonClicked(true);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-8 w-1/2 h-full shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to BotPress Styler
      </h2>
      <p className="text-gray-900 mb-6">
        Customize the appearance of your chatbot effortlessly with BotPress
        Styler. Enhance the user experience and create a visually appealing
        chatbot interface using the options on the left sidebar. From color
        schemes to dimensions, personalize every aspect of your chatbot to align
        with your brand and engage your users effectively.
      </p>
      <div className="max-h-32 overflow-y-auto mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className="text-gray-900 text-sm">
            I agree to the terms and conditions.
          </span>
        </label>
        <p className="text-sm text-gray-900">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          convallis odio. Mauris fringilla dapibus leo, sed interdum tortor
          luctus in. // Add your terms and conditions text here
        </p>
      </div>
      <button
        className="w-1/2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!isChecked}
        onClick={handleGetStarted}
      >
        Get Started
      </button>
      {isChecked && buttonClicked && (
        <UploadCSS /* add props as needed */ />
      )}
    </div>
  );
};
