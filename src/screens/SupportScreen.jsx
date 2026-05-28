import { FaClipboardList, FaEnvelope, FaTelegram, FaWhatsapp, FaChevronRight } from "react-icons/fa";

const supportOptions = [
  { icon: FaClipboardList, title: "Check FAQs", subtitle: "Read our extensive help articles" },
  { icon: FaEnvelope, title: "Contact customer support through email", subtitle: "Seek help from our support team" },
  { icon: FaTelegram, title: "Join our Telegram Channel", subtitle: "you can easily join our Telegram Channel" },
  { icon: FaWhatsapp, title: "Message us on Whatsapp", subtitle: "Text us on Whatsapp and get immediate response" },
];

export default function SupportScreen() {
  return (
    <div className="min-h-screen pb-24 md:pb-28">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <h2 className="font-family-script text-white text-2xl md:text-3xl text-center">Support</h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8">
        <p className="font-family-script text-white text-xl md:text-2xl">
          How can we help you today?
        </p>
      </div>

      {/* Support Options */}
      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-4">
        {supportOptions.map((option) => (
          <button
            key={option.title}
            className="w-full flex items-center gap-4 py-4 md:py-5 border-b border-navy-600/50 group hover:bg-navy-700/30 transition-colors rounded-lg px-2"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
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
            <FaChevronRight className="text-gray-500 group-hover:text-white transition-colors" size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}
