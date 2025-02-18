import { useState } from "react";

function CenterTab() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Questions", "Responses"];

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
      {/* Tabs Header */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center text-[12px] font-semibold capitalize transition ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "border-transparent text-[#5f6368] hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      
    </div>
  );
}

export default CenterTab;
