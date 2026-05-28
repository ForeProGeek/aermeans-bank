import { FaHome, FaExchangeAlt, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const tabs = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "transactions", label: "Transactions", icon: FaExchangeAlt },
  { id: "usdt", label: "USDT", icon: FaMoneyBillWave },
  { id: "support", label: "Support", icon: FaHeadset },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-navy-800 border-t border-navy-600 z-50">
      <div className="flex items-center justify-around py-2 pb-safe">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 ${
                isActive ? "text-white -mt-4" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "w-12 h-12 bg-navy-600 border-2 border-navy-900 shadow-lg"
                    : "w-8 h-8"
                }`}
              >
                <Icon size={isActive ? 20 : 18} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-white" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
