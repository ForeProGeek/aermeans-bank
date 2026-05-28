import { useState } from "react";
import { FaUser, FaHeadphones, FaFingerprint, FaBackspace } from "react-icons/fa";
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
    <div className="min-h-screen w-full flex flex-col px-6 py-8 md:items-center md:justify-center">
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-base">æ</span>
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 bg-gold-dark rounded-full flex items-center justify-center">
            <FaHeadphones className="text-gold" size={18} />
          </button>
        </div>

        {/* Avatar + Welcome */}
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gold-dark rounded-full flex items-center justify-center mb-4">
            <FaUser className="text-gold" size={36} md:size={48} />
          </div>
          <h2 className="font-family-script text-2xl md:text-3xl text-white mb-1">
            Welcome back, {userName}! 👋
          </h2>
          <p className="font-family-script text-gray-400 text-sm md:text-base">
            Enter your PIN to access your Aermeans account.
          </p>
        </div>

        {/* PIN dots */}
        <div className={`flex items-center justify-center gap-4 md:gap-5 mb-4 ${error ? "animate-shake" : ""}`}>
          {Array.from({ length: maxPinLength }).map((_, i) => (
            <div key={i} className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-200 ${error ? "bg-red-500" : i < pin.length ? "bg-gold" : "bg-navy-500"}`} />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm md:text-base text-center mb-4 font-medium">
            Incorrect PIN. Try again.
          </p>
        )}

        <div className="border-t border-gray-700 mb-4 md:mb-6"></div>

        <div className="flex items-center justify-between mb-6 md:mb-8 px-2">
          <div className="text-sm md:text-base">
            <span className="text-gray-400 font-family-script">Not {userName}? </span>
            <button className="text-gold font-family-script font-semibold">Switch account</button>
          </div>
          <button className="text-gold font-family-script font-semibold text-sm md:text-base">Forgot PIN?</button>
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4 max-w-sm md:max-w-md mx-auto w-full">
          {numbers.map((num) => (
            <button key={num} onClick={() => handleNumber(num)}
              className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gold-dark rounded-full flex items-center justify-center text-gold-light text-2xl md:text-3xl font-semibold font-family-script active:scale-95 transition-transform hover:bg-gold-darker">
              {num}
            </button>
          ))}
          <button onClick={() => handleNumber("0")}
            className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gold-dark rounded-full flex items-center justify-center text-gold-light text-2xl md:text-3xl font-semibold font-family-script active:scale-95 transition-transform hover:bg-gold-darker">
            0
          </button>
          <button className="w-16 h-16 md:w-20 md:h-20 mx-auto flex items-center justify-center text-gold active:scale-95 transition-transform">
            <FaFingerprint size={28} md:size={32} />
          </button>
          <button onClick={handleDelete}
            className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-red-500/80 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform hover:bg-red-600">
            <FaBackspace size={20} md:size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
