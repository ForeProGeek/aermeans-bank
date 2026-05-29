import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars, FaBell, FaEye, FaEyeSlash, FaUniversity,
  FaPaperPlane, FaGift, FaWifi, FaMobileAlt,
  FaDice, FaHashtag, FaTv, FaSun,
  FaBuilding, FaCheckCircle, FaCopy, FaCheck,
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
  const [copied, setCopied] = useState(false);

  const displayName = user?.fullName || "User";
  const firstName = displayName.split(" ")[0];
  const balance = user?.balance ?? 0.00;
  const accountNumber = user?.accountNumber || "";
  const bankName = user?.bankName || "Nombank(Amucha) MFB";

  const handleCopy = () => {
    if (!accountNumber) return;
    navigator.clipboard?.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="px-4 md:px-8 lg:px-12 relative z-10 space-y-4 md:space-y-6">

        {/* ========== ROW 1: Balance + Account Details ========== */}
        <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8">

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden relative p-5 md:p-6 lg:p-8"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #1e3a5f 50%, #172554 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
            <div className="absolute bottom-0 right-10 w-24 h-24 bg-purple-500/15 rounded-full translate-y-1/2 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            <div className="relative z-10">
              <p className="font-family-script text-white/80 text-sm md:text-base mb-2">Wallet Balance</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {showBalance ? `₦${balance.toFixed(2)}` : "₦****"}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>

              {/* Quick Actions — inside balance card on mobile, separate on desktop */}
              <div className="flex gap-3 md:gap-4">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action.label}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 md:px-4 md:py-2.5 transition-all border border-white/10"
                  >
                    <action.icon className="text-gold" size={14} />
                    <span className="font-family-script text-white text-xs md:text-sm">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Account Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-0 rounded-2xl p-5 md:p-6 lg:p-8 relative overflow-hidden border border-gold/20"
            style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.04))" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl" />

            <div className="relative z-10">
              <p className="font-family-script text-gold text-sm md:text-base mb-4">Account Information</p>

              {/* Account Number */}
              <div className="mb-4">
                <p className="text-white/60 text-xs md:text-sm mb-1">Account Number</p>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-wider font-mono">
                    {accountNumber || "—"}
                  </span>
                  {accountNumber && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors border border-white/10"
                    >
                      {copied ? <FaCheck className="text-green-400" size={14} /> : <FaCopy className="text-gold" size={14} />}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Account Name */}
              <div className="mb-4">
                <p className="text-white/60 text-xs md:text-sm mb-1">Account Name</p>
                <p className="text-white text-base md:text-lg font-medium">{displayName}</p>
              </div>

              {/* Bank Name */}
              <div>
                <p className="text-white/60 text-xs md:text-sm mb-1">Bank Name</p>
                <p className="text-gold-light text-base md:text-lg font-medium">{bankName}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========== ROW 2: Services Grid ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-family-script text-white text-xl md:text-2xl mb-3 md:mb-4">Our Services</h3>
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
                    <service.icon className="text-white" size={20} />
                  </div>
                  <span className="font-family-script text-white text-[10px] md:text-xs text-center leading-tight">
                    {service.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========== ROW 3: SMS Verification Banner ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl glass-card p-4 md:p-6 lg:p-8"
        >
          <p className="font-family-script text-white text-center text-base md:text-lg mb-3">
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
                <Icon className="text-white" size={14} />
              </motion.div>
            ))}
          </div>
          <p className="font-family-script text-gold text-center text-sm md:text-base mt-3">
            Tap here to buy number now
          </p>
        </motion.div>
      </div>
    </div>
  );
}
