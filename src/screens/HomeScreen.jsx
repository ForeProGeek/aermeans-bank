import { useState } from "react";
import {
  FaBars, FaBell, FaEye, FaEyeSlash, FaUniversity,
  FaPaperPlane, FaGift, FaWifi, FaMobileAlt,
  FaDice, FaHashtag, FaTv, FaSun,
  FaBuilding, FaCheckCircle, FaChevronRight,
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

export default function HomeScreen({ onNavigate }) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button className="w-10 h-10 bg-gold-dark rounded-full flex items-center justify-center">
          <FaBars className="text-gold" size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-family-script text-lg text-white">Hi, Joshua</span>
          <span className="text-lg">👋</span>
        </div>
        <button className="w-10 h-10 bg-gold-dark rounded-full flex items-center justify-center relative">
          <FaBell className="text-gold" size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy-900"></span>
        </button>
      </div>

      {/* Wallet Balance Card */}
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-blue-800 p-5">
        {/* Decorative wave */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/30 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 right-10 w-24 h-24 bg-purple-500/20 rounded-full translate-y-1/2"></div>
        
        <div className="relative z-10">
          <p className="font-family-script text-white/80 text-sm mb-1">Wallet Balance</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-white">
              {showBalance ? "₦0.61" : "₦****"}
            </span>
            <button onClick={() => setShowBalance(!showBalance)} className="text-white/80">
              {showBalance ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="mx-4 mb-4 rounded-xl bg-gold-dark/60 p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="font-family-script text-gold-light text-sm">Account number</p>
            <p className="font-family-script text-gold-light text-sm">Account name</p>
            <p className="font-family-script text-gold-light text-sm">Bank name</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-white text-sm font-medium">1228788473</p>
            <p className="font-family-script text-gold-light text-sm">Joshua Agboola</p>
            <p className="font-family-script text-gold-light text-sm">Nombank(Amucha) MFB</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4 mb-4 rounded-2xl bg-navy-700 p-5">
        <div className="flex justify-around">
          {quickActions.map((action) => (
            <button key={action.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center">
                <action.icon className="text-gold" size={22} />
              </div>
              <span className="font-family-script text-white text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SMS Verification Banner */}
      <div className="mx-4 mb-5 rounded-2xl bg-navy-700 p-4">
        <p className="font-family-script text-white text-center text-lg mb-3">
          Receive Verification SMS Online
        </p>
        <div className="border-t border-gray-600 mb-3"></div>
        <div className="flex justify-center gap-3 flex-wrap">
          {socialIcons.map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center">
              <Icon className="text-white" size={14} />
            </div>
          ))}
        </div>
        <p className="font-family-script text-gold text-center text-sm mt-3">
          Tap here to buy number now
        </p>
      </div>

      {/* Our Services */}
      <div className="px-4 mb-4">
        <h3 className="font-family-script text-white text-xl mb-4">Our Services</h3>
        <div className="rounded-2xl bg-navy-700 p-5">
          <div className="grid grid-cols-4 gap-4">
            {services.map((service) => (
              <button key={service.label} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center`}>
                  <service.icon className="text-white" size={20} />
                </div>
                <span className="font-family-script text-white text-[10px] text-center leading-tight">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
