import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaHeadphones, FaBackspace } from "react-icons/fa";
import { refreshSession } from "../data/users";

export default function PinLoginScreen({ onLogin }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const maxPinLength = 6;

  const user = refreshSession();
  const userName = user?.fullName?.split(" ")[0] || "Joshua";
  const correctPin = user?.pin || "123456";

  const handleNumber = (num) => {
    if (pin.length < maxPinLength) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      if (newPin.length === maxPinLength) {
        setTimeout(() => {
          if (newPin === correctPin) onLogin();
          else { setError(true); setPin(""); }
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="min-h-screen w-full flex flex-col px-6 py-8 md:items-center md:justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[100px]" />

      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 md:mb-10">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-sm md:text-base">æ</span>
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 bg-gold-dark rounded-full flex items-center justify-center hover:bg-gold/30 transition-colors">
            <FaHeadphones className="text-gold" size={18} />
          </button>
        </motion.div>

        {/* Avatar + Welcome */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center mb-8 md:mb-10">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gold-dark rounded-full flex items-center justify-center mb-4 border-2 border-gold/30">
              <FaUser className="text-gold" size={36} />
            </div>
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
          </div>
          <h2 className="font-family-script text-2xl md:text-3xl text-white mb-1">
            Welcome back, {userName}! 👋
          </h2>
          <p className="font-family-script text-gray-400 text-sm md:text-base">
            Enter your PIN to access your Aermeans account.
          </p>
        </motion.div>

        {/* PIN dots */}
        <div className={`flex items-center justify-center gap-4 md:gap-5 mb-4 ${error ? "animate-shake" : ""}`}>
          {Array.from({ length: maxPinLength }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: i < pin.length ? 1.2 : 1,
                backgroundColor: error ? "#ef4444" : i < pin.length ? "#c9a227" : "#1e3a5f",
              }}
              className="w-4 h-4 md:w-5 md:h-5 rounded-full transition-colors"
            />
          ))}
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm md:text-base text-center mb-4 font-medium">
            Incorrect PIN. Try again.
          </motion.p>
        )}

        <div className="border-t border-white/10 mb-4 md:mb-6"></div>

        <div className="flex items-center justify-between mb-6 md:mb-8 px-2">
          <div className="text-sm md:text-base">
            <span className="text-gray-400 font-family-script">Not {userName}? </span>
            <button className="text-gold font-family-script font-semibold hover:text-gold-light transition-colors">Switch account</button>
          </div>
          <button className="text-gold font-family-script font-semibold text-sm md:text-base hover:text-gold-light transition-colors">Forgot PIN?</button>
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4 max-w-sm md:max-w-md mx-auto w-full">
          {numbers.map((num, i) => (
            <motion.button
              key={num}
              onClick={() => handleNumber(num)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gold-light text-2xl md:text-3xl font-semibold font-family-script active:bg-gold/20 hover:border-gold/30 transition-all"
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            onClick={() => handleNumber("0")}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27 }}
            className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gold-light text-2xl md:text-3xl font-semibold font-family-script active:bg-gold/20 hover:border-gold/30 transition-all"
          >
            0
          </motion.button>
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto" />
          <motion.button
            onClick={handleDelete}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-red-500/80 rounded-full flex items-center justify-center text-white active:bg-red-600 transition-colors hover:shadow-lg hover:shadow-red-500/30"
          >
            <FaBackspace size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
