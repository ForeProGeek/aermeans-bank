import { FaArrowRight, FaShieldAlt, FaBolt, FaMobileAlt, FaGlobe, FaHeadset, FaStar } from "react-icons/fa";

const features = [
  { icon: FaBolt, title: "Instant Transfers", desc: "Send and receive money in seconds, 24/7." },
  { icon: FaShieldAlt, title: "Bank-Grade Security", desc: "Your funds are protected with 6-digit PIN & encryption." },
  { icon: FaMobileAlt, title: "Airtime & Data", desc: "Buy airtime, data, and pay bills in one tap." },
  { icon: FaGlobe, title: "USDT Wallet", desc: "Store and withdraw USDT on the TRC-20 network." },
  { icon: FaHeadset, title: "24/7 Support", desc: "Reach us via WhatsApp, Telegram, or Email anytime." },
  { icon: FaStar, title: "Rewards Program", desc: "Earn points on every transaction you make." },
];

const steps = [
  { step: "1", title: "Sign Up", desc: "Create your account in under 2 minutes." },
  { step: "2", title: "Get Your PIN", desc: "Set a secure 6-digit PIN for all transactions." },
  { step: "3", title: "Start Banking", desc: "Fund your wallet and enjoy seamless banking." },
];

export default function LandingScreen({ onGetStarted }) {
  return (
    <div className="min-h-screen w-full bg-navy-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-800 to-navy-900 px-4 md:px-8 py-12 md:py-20">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xl">æ</span>
            </div>
            <span className="text-white font-bold text-2xl md:text-3xl tracking-wide">aermeans</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Banking Made<br />
            <span className="text-gold">Simple</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Experience seamless transactions, secure PIN protection, and a USDT wallet — all in one app.
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold rounded-full text-navy-900 font-bold text-lg hover:bg-gold-light transition-all hover:scale-105 active:scale-95"
          >
            Get Started <FaArrowRight />
          </button>

          <p className="text-gray-400 text-sm mt-4">No hidden fees. Open an account in 2 minutes.</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-navy-800 border-y border-navy-600">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gold text-2xl md:text-3xl font-bold">50K+</p>
            <p className="text-gray-400 text-sm md:text-base">Users</p>
          </div>
          <div>
            <p className="text-gold text-2xl md:text-3xl font-bold">₦2B+</p>
            <p className="text-gray-400 text-sm md:text-base">Transactions</p>
          </div>
          <div>
            <p className="text-gold text-2xl md:text-3xl font-bold">99.9%</p>
            <p className="text-gray-400 text-sm md:text-base">Uptime</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Everything You Need
        </h2>
        <p className="text-gray-400 text-center mb-12 md:text-lg">
          All the tools to manage your money, right in your pocket.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-navy-700 rounded-2xl p-6 border border-navy-600 hover:border-gold/50 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gold-dark rounded-xl flex items-center justify-center mb-4">
                <f.icon className="text-gold" size={22} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-navy-800 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-navy-900 font-bold text-2xl">{s.step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Bank Smarter?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of Nigerians who trust Aermeans for their daily banking.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold rounded-full text-navy-900 font-bold text-lg hover:bg-gold-light transition-all hover:scale-105 active:scale-95"
          >
            Create Free Account <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-navy-600 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-sm">æ</span>
            </div>
            <span className="text-white font-bold text-lg">aermeans</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Aermeans Bank. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
