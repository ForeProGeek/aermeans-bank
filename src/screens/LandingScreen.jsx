import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaArrowRight, FaShieldAlt, FaBolt, FaMobileAlt,
  FaGlobe, FaHeadset, FaStar, FaCheckCircle,
  FaUsers, FaLock, FaWallet
} from "react-icons/fa";

/* ── Animated counter helper ── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Data ── */
const features = [
  { icon: FaBolt, title: "Instant Transfers", desc: "Send and receive money in seconds, 24/7. No delays, no hidden queues." },
  { icon: FaShieldAlt, title: "Bank-Grade Security", desc: "Your funds are protected with a 6-digit PIN, encryption, and fraud monitoring." },
  { icon: FaMobileAlt, title: "Airtime & Data", desc: "Buy airtime, mobile data, and pay utility bills in a single tap." },
  { icon: FaGlobe, title: "USDT Wallet", desc: "Store, receive, and withdraw USDT on the TRC-20 network seamlessly." },
  { icon: FaHeadset, title: "24/7 Support", desc: "Reach our team via WhatsApp, Telegram, or Email anytime you need help." },
  { icon: FaStar, title: "Rewards Program", desc: "Earn points and cashback on every transaction you make with us." },
];

const steps = [
  { step: "1", title: "Sign Up", desc: "Create your account in under 2 minutes with just your basic details." },
  { step: "2", title: "Secure Your PIN", desc: "Set a private 6-digit PIN to lock and protect all your transactions." },
  { step: "3", title: "Start Banking", desc: "Fund your wallet instantly and enjoy seamless banking everywhere." },
];

const testimonials = [
  { name: "Chioma O.", role: "Business Owner", text: "Aermeans made paying my suppliers so fast. The USDT wallet is a game changer." },
  { name: "Emmanuel K.", role: "Software Developer", text: "Clean interface, instant transfers, and the rewards keep adding up. Love it." },
  { name: "Aisha B.", role: "Student", text: "I buy data and airtime every week. Never had a failed transaction." },
];

/* ── Fade-up wrapper ── */
function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingScreen({ onGetStarted }) {
  return (
    <div className="min-h-screen w-full bg-[#060d18] relative overflow-hidden">
      {/* ═══════════════════════════════════════
          ANIMATED BACKGROUND
      ═══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Giant blurred glow orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Floating gold particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 lg:px-24 pt-16 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
                <span className="text-navy-900 font-bold text-xl">æ</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wide">aermeans</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 border border-gold/50 text-gold rounded-full text-sm font-semibold hover:bg-gold hover:text-navy-900 transition-all"
            >
              Open App
            </button>
          </motion.nav>

          {/* Hero Content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm">Now serving 50,000+ customers nationwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-6"
            >
              Banking Made{" "}
              <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
                Simple
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Experience seamless transactions, secure PIN protection, crypto wallet support,
              and instant bill payments — all in one beautiful app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={onGetStarted}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold rounded-full text-navy-900 font-bold text-lg hover:bg-gold-light transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gold/20"
              >
                Get Started Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 grid grid-cols-3 gap-8">
          {[
            { value: 50000, suffix: "+", label: "Active Users" },
            { value: 2000000000, suffix: "", label: "Naira Transacted", prefix: "₦" },
            { value: 99, suffix: "%", label: "Uptime" },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-gold text-3xl md:text-4xl font-bold mb-1">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Everything You Need
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                All the tools to manage your money, right in your pocket.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                      <f.icon className="text-gold" size={24} />
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-3">{f.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-gray-400 text-lg">Get started in three simple steps.</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0" />

            {steps.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl shadow-gold/20 rotate-3 group-hover:rotate-0 transition-transform">
                      <span className="text-navy-900 font-extrabold text-3xl">{s.step}</span>
                    </div>
                    <div className="absolute inset-0 bg-gold rounded-2xl blur-xl opacity-20" />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Loved by Thousands</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 relative">
                  <div className="text-gold/30 text-6xl font-serif absolute top-4 left-6">"</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10 pt-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-gold font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BADGES
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 py-16 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { icon: FaLock, text: "256-bit Encryption" },
                { icon: FaShieldAlt, text: "Fraud Protected" },
                { icon: FaWallet, text: "CBN Licensed" },
                { icon: FaUsers, text: "NDPR Compliant" },
                { icon: FaCheckCircle, text: "ISO Certified" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-gray-500">
                  <badge.icon className="text-gold/60" size={16} />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center relative">
            {/* Glowing orb behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Bank{" "}
                <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
                  Smarter?
                </span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                Join thousands of Nigerians who trust Aermeans for fast, secure, and seamless banking.
              </p>
              <button
                onClick={onGetStarted}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gold rounded-full text-navy-900 font-bold text-lg hover:bg-gold-light transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gold/30"
              >
                Create Free Account
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-600 text-sm mt-6">No hidden fees. No minimum balance. Cancel anytime.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 bg-[#040810] px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-sm">æ</span>
            </div>
            <span className="text-white font-bold text-lg">aermeans</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Support</a>
          </div>
          <p className="text-gray-600 text-sm">© 2025 Aermeans Bank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
