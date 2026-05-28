import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars, FaBell, FaEye, FaEyeSlash, FaUniversity,
  FaPaperPlane, FaGift, FaWifi, FaMobileAlt,
  FaDice, FaHashtag, FaTv, FaSun,
  FaBuilding, FaCheckCircle,
  FaFacebook, FaWhatsapp, FaInstagram, FaGooglePlus,
  FaTelegram, FaAmazon, FaPaypal, FaYoutube
} from "react-icons/fa";

const quickActions = [
  { icon: FaUniversity, label: "Fund Account" },
  { icon: FaPaperPlane, label: "Send Money" },
  { icon: FaGift, label: "Rewards" },
];

const services = [
  { icon: FaWifi, label: "Buy Data", color: "bg-purple-500" },
  { icon: FaMobileAlt, label: "Buy Airtime", color: "bg-blue-500" },
  { icon: FaDice, label: "Betting", color: "bg-green-500" },
  { icon: FaHashtag, label: "Recharge Pin", color: "bg-gray-500" },
  { icon: FaTv, label: "Cable Tv", color: "bg-indigo-500" },
  { icon: FaSun, label: "Electricity", color: "bg-orange-500" },
  { icon: FaBuilding, label: "Jamb Pin", color: "bg-pink-500" },
  { icon: FaCheckCircle, label: "Waec/Neco Pin", color: "bg-green-600" },
];

const socialIcons = [
  FaFacebook, FaWhatsapp, FaInstagram, FaGooglePlus,
  FaTelegram, FaAmazon, FaPaypal, FaYoutube,
];

export default function HomeScreen({ user, onNavigate }) {
  const [showBalance, setShowBalance] = useState(false);

  const displayName = user?.fullName || "Joshua Agboola";
  const firstName = displayName.split(" ")[0];
  const balance = user?.balance ?? 0.61;
  const accountNumber = user?.accountNumber || "1228788473";
  const bankName = user?.bankName || "Nombank(Amucha) MFB";

  return (
    <div className="min-h-screen pb-24 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 md:py-6 relative z-10"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate("profile")}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-all"
        >
          <FaBars className="text-gold" size={18} />
        </motion.button>
        <div className="flex items-center gap-2">
          <span className="font-family-script text-lg md:text-2xl text-white">Hi, {firstName}</span>
          <span className="text-lg md:text-2xl">👋</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative hover:bg-gold/20 hover:border-gold/30 transition-all"
        >
          <FaBell className="text-gold" size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy-900 animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 relative z-10">
        {/* Left Column */}
        <div>
          {/* Wallet Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 md:mb-4 rounded-2xl overflow-hidden relative p-5 md:p-6 lg:p-8"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #1e3a5f 50%, #172554 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
            <div className="absolute bottom-0 right-10 w-24 h-24 bg-purple-500/15 rounded-full translate-y-1/2 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            <div className="relative z-10">
              <p className="font-family-script text-white/80 text-sm md:text-base mb-1">Wallet Balance</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {showBalance ? `₦${balance.toFixed(2)}` : "₦****"}
                </span>
                <button onClick={() => setShowBalance(!showBalance)} className="text-white/80 hover:text-white transition-colors">
                  {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Account Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 md:mb-6 rounded-xl p-4 md:p-5 lg:p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))" }}
          >
            <div className="absolute inset-0 border border-gold/20 rounded-xl" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1 md:space-y-2">
                <p className="font-family-script text-gold-light text-sm md:text-base">Account number</p>
                <p className="font-family-script text-gold-light text-sm md:text-base">Account name</p>
                <p className="font-family-script text-gold-light text-sm md:text-base">Bank name</p>
              </div>
              <div className="text-right space-y-1 md:space-y-2">
                <p className="text-white text-sm md:text-base font-medium">{accountNumber}</p>
                <p className="font-family-script text-gold-light text-sm md:text-base">{displayName}</p>
                <p className="font-family-script text-gold-light text-sm md:text-base">{bankName}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 md:mb-6 rounded-2xl glass-card p-5 md:p-6 lg:p-8"
          >
            <div className="flex justify-around">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 md:gap-3 group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gold/50 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/20 transition-all">
                    <action.icon className="text-gold" size={22} />
                  </div>
                  <span className="font-family-script text-white text-xs md:text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div>
          {/* SMS Verification Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-5 md:mb-6 rounded-2xl glass-card p-4 md:p-6 lg:p-8"
          >
            <p className="font-family-script text-white text-center text-lg md:text-xl mb-3">
              Receive Verification SMS Online
            </p>
            <div className="border-t border-white/10 mb-3"></div>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
              {socialIcons.map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer border border-white/10 hover:border-gold/30"
                >
                  <Icon className="text-white" size={14} md:size={16} />
                </motion.div>
              ))}
            </div>
            <p className="font-family-script text-gold text-center text-sm md:text-base mt-3">
              Tap here to buy number now
            </p>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-4"
          >
            <h3 className="font-family-script text-white text-xl md:text-2xl mb-4 md:mb-5">Our Services</h3>
            <div className="rounded-2xl glass-card p-5 md:p-6 lg:p-8">
              <div className="grid grid-cols-4 gap-4 md:gap-6">
                {services.map((service, i) => (
                  <motion.button
                    key={service.label}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex flex-col items-center gap-2 md:gap-3 group"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="text-white" size={20} md:size={24} />
                    </div>
                    <span className="font-family-script text-white text-[10px] md:text-xs text-center leading-tight">
                      {service.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
