import { motion } from "framer-motion";
import { FaClipboardList, FaEnvelope, FaTelegram, FaWhatsapp, FaChevronRight } from "react-icons/fa";

const supportOptions = [
  { icon: FaClipboardList, title: "Check FAQs", subtitle: "Read our extensive help articles" },
  { icon: FaEnvelope, title: "Contact customer support through email", subtitle: "Seek help from our support team" },
  { icon: FaTelegram, title: "Join our Telegram Channel", subtitle: "you can easily join our Telegram Channel" },
  { icon: FaWhatsapp, title: "Message us on Whatsapp", subtitle: "Text us on Whatsapp and get immediate response" },
];

export default function SupportScreen() {
  return (
    <div className="min-h-screen pb-24 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 md:px-8 lg:px-12 py-4 md:py-6 relative z-10"
      >
        <h2 className="font-family-script text-white text-2xl md:text-3xl text-center">Support</h2>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8 relative z-10"
      >
        <p className="font-family-script text-white text-xl md:text-2xl">
          How can we help you today?
        </p>
      </motion.div>

      {/* Support Options */}
      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-4 relative z-10">
        {supportOptions.map((option, i) => (
          <motion.button
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-4 py-4 md:py-5 glass-card rounded-2xl p-4 md:p-5 mb-3 md:mb-0 hover:border-gold/30 transition-all group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 group-hover:border-gold/50 transition-all">
              <option.icon className="text-gold" size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-family-script text-white text-base md:text-lg leading-tight">
                {option.title}
              </p>
              <p className="font-family-script text-gray-400 text-sm md:text-base mt-0.5">
                {option.subtitle}
              </p>
            </div>
            <FaChevronRight className="text-gray-500 group-hover:text-gold transition-colors" size={14} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
