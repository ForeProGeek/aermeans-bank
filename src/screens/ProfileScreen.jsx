import {
  FaUser, FaChevronRight, FaCrown,
  FaIdCard, FaFileAlt, FaLock, FaGift, FaUsers,
  FaInfoCircle, FaFileContract, FaShieldAlt, FaSignOutAlt,
  FaSun, FaMoon, FaArrowUp
} from "react-icons/fa";

const menuItems = [
  { icon: FaUser, label: "Profile" },
  { icon: FaCrown, label: "Account Tiers" },
  { icon: FaIdCard, label: "Add BVN / NIN" },
  { icon: FaFileAlt, label: "Request Statement" },
  { icon: FaLock, label: "Security settings" },
  { icon: FaGift, label: "Rewards" },
  { icon: FaUsers, label: "Refer & Earn" },
  { icon: FaInfoCircle, label: "About Aermeans" },
  { icon: FaFileContract, label: "Terms of Service" },
  { icon: FaShieldAlt, label: "Privacy and policy" },
];

export default function ProfileScreen({ user, onBack, onLogout, theme, onToggleTheme }) {
  const isLight = theme === "light";
  const displayName = user?.fullName || "Joshua Agboola";
  const username = user?.username || "geek";
  const joinedDate = user?.joinedDate || "Nov 11, 2024";
  const tier = user?.tier || "REGULAR";

  return (
    <div className="min-h-screen pb-24 md:pb-28">
      {/* Profile Header */}
      <div className="mx-4 md:mx-8 mt-4 md:mt-6 mb-4 md:mb-6 rounded-2xl bg-blue-700 p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center">
            <FaUser className="text-navy-900" size={24} />
          </div>
          <div>
            <h3 className="font-family-script text-white text-lg md:text-xl">{displayName}</h3>
            <p className="font-family-script text-gray-300 text-sm md:text-base">Username : {username}</p>
            <p className="font-family-script text-gray-300 text-sm md:text-base">Joined {joinedDate}</p>
          </div>
        </div>
        <span className="px-4 py-1.5 md:px-5 md:py-2 bg-navy-900 rounded-lg font-family-script text-white text-sm md:text-base">
          {tier}
        </span>
      </div>

      {/* Menu Items */}
      <div className="px-4 md:px-8 md:grid md:grid-cols-2 md:gap-x-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-4 py-3.5 md:py-4 border-b border-navy-600/50 group hover:bg-navy-700/30 transition-colors rounded-lg px-2"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 bg-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
              <item.icon className="text-gold" size={16} />
            </div>
            <span className="flex-1 text-left font-family-script text-white text-base md:text-lg">
              {item.label}
            </span>
            <FaChevronRight className="text-gray-500 group-hover:text-white transition-colors" size={14} />
          </button>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-around px-4 md:px-8 py-6 md:py-8 mt-4 md:mt-6">
        <button onClick={onLogout}
          className="flex items-center gap-2 text-red-400 font-family-script hover:text-red-300 transition-colors md:text-lg">
          <FaSignOutAlt size={16} /> Sign out
        </button>
        <button onClick={onToggleTheme}
          className="flex items-center gap-2 text-gray-400 font-family-script hover:text-white transition-colors md:text-lg">
          {isLight ? <FaMoon size={16} /> : <FaSun size={16} />}
          {isLight ? "Dark" : "Light"}
        </button>
        <button className="flex items-center gap-2 text-gray-400 font-family-script md:text-lg">
          <FaArrowUp size={16} /> Version 1.5.8
        </button>
      </div>
    </div>
  );
}
