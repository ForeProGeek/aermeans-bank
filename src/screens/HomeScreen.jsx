import { useState } from "react";
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
    <div className="min-h-screen pb-24 md:pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <button onClick={() => onNavigate("profile")}
          className="w-10 h-10 md:w-12 md:h-12 bg-gold-dark rounded-full flex items-center justify-center hover:bg-gold-darker transition-colors">
          <FaBars className="text-gold" size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-family-script text-lg md:text-2xl text-white">Hi, {firstName}</span>
          <span className="text-lg md:text-2xl">👋</span>
        </div>
        <button className="w-10 h-10 md:w-12 md:h-12 bg-gold-dark rounded-full flex items-center justify-center relative hover:bg-gold-darker transition-colors">
          <FaBell className="text-gold" size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy-900"></span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        {/* Left Column */}
        <div>
          {/* Wallet Balance Card */}
          <div className="mb-3 md:mb-4 rounded-2xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-blue-800 p-5 md:p-6 lg:p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/30 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 right-10 w-24 h-24 bg-purple-500/20 rounded-full translate-y-1/2"></div>
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
          </div>

          {/* Account Details Card */}
          <div className="mb-4 md:mb-6 rounded-xl bg-gold-dark/60 p-4 md:p-5 lg:p-6">
            <div className="flex justify-between items-start">
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
          </div>

          {/* Quick Actions */}
          <div className="mb-4 md:mb-6 rounded-2xl bg-navy-700 p-5 md:p-6 lg:p-8">
            <div className="flex justify-around">
              {quickActions.map((action) => (
                <button key={action.label} className="flex flex-col items-center gap-2 md:gap-3 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gold flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <action.icon className="text-gold" size={22} md:size={26} />
                  </div>
                  <span className="font-family-script text-white text-xs md:text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* SMS Verification Banner */}
          <div className="mb-5 md:mb-6 rounded-2xl bg-navy-700 p-4 md:p-6 lg:p-8">
            <p className="font-family-script text-white text-center text-lg md:text-xl mb-3">
              Receive Verification SMS Online
            </p>
            <div className="border-t border-gray-600 mb-3"></div>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
              {socialIcons.map((Icon, i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-navy-600 flex items-center justify-center hover:bg-navy-500 transition-colors cursor-pointer">
                  <Icon className="text-white" size={14} md:size={16} />
                </div>
              ))}
            </div>
            <p className="font-family-script text-gold text-center text-sm md:text-base mt-3">
              Tap here to buy number now
            </p>
          </div>

          {/* Our Services */}
          <div className="mb-4">
            <h3 className="font-family-script text-white text-xl md:text-2xl mb-4 md:mb-5">Our Services</h3>
            <div className="rounded-2xl bg-navy-700 p-5 md:p-6 lg:p-8">
              <div className="grid grid-cols-4 gap-4 md:gap-6">
                {services.map((service) => (
                  <button key={service.label} className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="text-white" size={20} md:size={24} />
                    </div>
                    <span className="font-family-script text-white text-[10px] md:text-xs text-center leading-tight">
                      {service.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
