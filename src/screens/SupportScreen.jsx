import { FaClipboardList, FaEnvelope, FaTelegram, FaWhatsapp, FaChevronRight } from "react-icons/fa";

const supportOptions = [
  {
    icon: FaClipboardList,
    title: "Check FAQs",
    subtitle: "Read our extensive help articles",
  },
  {
    icon: FaEnvelope,
    title: "Contact customer support through email",
    subtitle: "Seek help from our support team",
  },
  {
    icon: FaTelegram,
    title: "Join our Telegram Channel",
    subtitle: "you can easily join our Telegram Channel",
  },
  {
    icon: FaWhatsapp,
    title: "Message us on Whatsapp",
    subtitle: "Text us on Whatsapp and get immediate response",
  },
];

export default function SupportScreen() {
  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="px-4 py-4">
        <h2 className="font-family-script text-white text-2xl text-center">Support</h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 mb-6">
        <p className="font-family-script text-white text-xl">
          How can we help you today?
        </p>
      </div>

      {/* Support Options */}
      <div className="px-4 space-y-1">
        {supportOptions.map((option) => (
          <button
            key={option.title}
            className="w-full flex items-center gap-4 py-4 border-b border-navy-600/50 group"
          >
            <div className="w-12 h-12 bg-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
              <option.icon className="text-gold" size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-family-script text-white text-base leading-tight">
                {option.title}
              </p>
              <p className="font-family-script text-gray-400 text-sm mt-0.5">
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
