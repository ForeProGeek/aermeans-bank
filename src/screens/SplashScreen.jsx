import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen w-full bg-[#003d99] flex flex-col items-center justify-between relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-gold/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[30%] left-[20%] w-[200px] h-[200px] bg-cyan-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Decorative wave at top */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-20">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="0.1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 z-10 mt-12 md:mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white text-center leading-tight mb-8"
        >
          Experience<br />
          <span className="inline-flex items-center gap-2">
            <span className="text-2xl md:text-4xl">→</span> Seamless
          </span><br />
          Transactions
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gold px-8 md:px-12 py-3 md:py-4 rounded-xl mb-12 md:mb-16 shadow-2xl shadow-gold/30"
        >
          <span className="text-navy-900 font-bold text-xl md:text-2xl tracking-wide">aermeans</span>
        </motion.div>

        {/* Avatar with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative w-64 h-80 md:w-80 md:h-96 flex items-end justify-center"
        >
          <div className="absolute bottom-0 w-56 md:w-72 h-72 md:h-80 bg-gradient-to-t from-gold/30 to-transparent rounded-t-full blur-xl" />
          <div className="relative z-10 text-center">
            <div className="w-48 md:w-64 h-56 md:h-72 bg-gold/20 rounded-t-full mx-auto flex items-center justify-center border border-gold/10">
              <span className="text-gold text-6xl md:text-8xl animate-bounce-soft">👩</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Loading bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold via-yellow-300 to-gold"
      />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="#0a1628" fillOpacity="0.4" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}
