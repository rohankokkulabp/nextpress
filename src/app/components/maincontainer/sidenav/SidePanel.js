import React from "react";

export const SidePanel = ({
  botId,
  items,
  activeItem,
  handleItemClick,
  handleBotIdChange,
  handlePublish,
}) => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md m-8 p-2">
      <div className="w-64 flex flex-col">
        <nav className="flex-1">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className={`px-4 py-2 hover:bg-gray-300 rounded-lg m-2 text-gray-900 cursor-pointer ${
                  activeItem === item.id ? "bg-gray-300" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
