import { motion } from "framer-motion";
import { FaSyncAlt, FaWallet } from "react-icons/fa";

export default function UsdtWalletScreen() {
  return (
    <div className="min-h-screen pb-24 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 md:px-8 lg:px-12 py-4 md:py-6 relative z-10"
      >
        <h2 className="font-family-script text-white text-2xl md:text-3xl text-center">USDT Wallet</h2>
      </motion.div>

      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 relative z-10">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 md:mb-0 rounded-2xl p-5 md:p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0f2744, #0a1628)" }}
        >
          <div className="absolute inset-0 border border-gold/20 rounded-2xl" />
          <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="font-family-script text-gray-300 md:text-lg">USDT Balance</span>
              <motion.button whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-gold transition-colors">
                <FaSyncAlt size={18} />
              </motion.button>
            </div>
            <p className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">$0.00</p>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-family-script">TRC-20</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gold rounded-full text-navy-900 font-semibold text-sm md:text-base hover:bg-gold-light transition-all animate-glow-pulse"
              >
                <FaWallet size={14} /> Withdraw
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div>
          {/* Generate Address Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 md:py-5 rounded-2xl text-navy-900 font-family-script font-semibold text-lg md:text-xl transition-all animate-glow-pulse"
              style={{ background: "linear-gradient(90deg, #c9a227, #d4af37, #c9a227)" }}
            >
              Tap to Generate Deposit Address
            </motion.button>
          </motion.div>

          {/* Recent Deposits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-family-script text-white text-xl md:text-2xl mb-4">Recent Deposits</h3>
            <div className="flex flex-col items-center justify-center py-16 md:py-24 text-gray-500 glass-card rounded-2xl">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl mb-4"
              >
                💸
              </motion.div>
              <p className="font-family-script text-lg md:text-xl">No recent deposits found.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
