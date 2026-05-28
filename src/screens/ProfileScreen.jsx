import { motion } from "framer-motion";
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
    <div className="min-h-screen pb-24 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 md:mx-8 lg:mx-12 mt-4 md:mt-6 mb-4 md:mb-6 rounded-2xl p-4 md:p-6 flex items-center justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e40af, #1e3a5f)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute top-[-50%] right-[-10%] w-[200px] h-[200px] bg-gold/10 rounded-full blur-[60px]" />

        <div className="relative z-10 flex items-center gap-3 md:gap-4">
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center shadow-xl shadow-gold/30">
              <FaUser className="text-navy-900" size={24} />
            </div>
            <div className="absolute inset-0 bg-gold/30 rounded-full blur-md" />
          </div>
          <div>
            <h3 className="font-family-script text-white text-lg md:text-xl">{displayName}</h3>
            <p className="font-family-script text-gray-300 text-sm md:text-base">Username : {username}</p>
            <p className="font-family-script text-gray-300 text-sm md:text-base">Joined {joinedDate}</p>
          </div>
        </div>
        <span className="relative z-10 px-4 py-1.5 md:px-5 md:py-2 rounded-lg font-family-script text-white text-sm md:text-base border border-gold/30 bg-gold/10">
          {tier}
        </span>
      </motion.div>

      {/* Menu Items */}
      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-x-6 relative z-10">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-4 py-3.5 md:py-4 border-b border-white/10 group hover:bg-white/5 transition-all rounded-lg px-2"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 group-hover:border-gold/50 transition-all">
              <item.icon className="text-gold" size={16} />
            </div>
            <span className="flex-1 text-left font-family-script text-white text-base md:text-lg">
              {item.label}
            </span>
            <FaChevronRight className="text-gray-500 group-hover:text-gold transition-colors" size={14} />
          </motion.button>
        ))}
      </div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-around px-4 md:px-8 lg:px-12 py-6 md:py-8 mt-4 md:mt-6 relative z-10"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 font-family-script hover:text-red-300 transition-colors md:text-lg"
        >
          <FaSignOutAlt size={16} /> Sign out
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="flex items-center gap-2 text-gray-400 font-family-script hover:text-gold transition-colors md:text-lg"
        >
          {isLight ? <FaMoon size={16} /> : <FaSun size={16} />}
          {isLight ? "Dark" : "Light"}
        </motion.button>
        <button className="flex items-center gap-2 text-gray-400 font-family-script md:text-lg">
          <FaArrowUp size={16} /> Version 1.5.8
        </button>
      </motion.div>
    </div>
  );
}
