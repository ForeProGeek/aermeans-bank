import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaFilter, FaBars } from "react-icons/fa";

const transactions = [
  { id: 1, type: "debit", title: "MTN Data 500MB GIFTING...", date: "May 7, 2025 @8:42", amount: "-₦350.00", balance: "₦0.61" },
  { id: 2, type: "credit", title: "Account Funding", date: "May 7, 2025 @8:41", amount: "+₦350.00", balance: "₦350.61" },
  { id: 3, type: "debit", title: "AIRTEL Data 1GB SME :36...", date: "Apr 25, 2025 @21:32", amount: "-₦370.00", balance: "₦0.61" },
  { id: 4, type: "credit", title: "Account Funding", date: "Apr 25, 2025 @21:31", amount: "+₦370.00", balance: "₦370.61" },
  { id: 5, type: "debit", title: "AIRTEL Data 1GB SME :36...", date: "Apr 25, 2025 @8:21", amount: "-₦370.00", balance: "₦0.61" },
  { id: 6, type: "credit", title: "Account Funding", date: "Apr 25, 2025 @8:21", amount: "+₦370.00", balance: "₦370.61" },
  { id: 7, type: "debit", title: "AIRTEL Data 1GB SME :36...", date: "Apr 24, 2025 @10:56", amount: "-₦370.00", balance: "₦0.61" },
  { id: 8, type: "credit", title: "Account Funding", date: "Apr 24, 2025 @10:54", amount: "+₦370.00", balance: "₦370.61" },
];

export default function TransactionsScreen() {
  return (
    <div className="min-h-screen pb-24 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 md:px-8 lg:px-12 py-4 md:py-6 border-b border-white/10 relative z-10"
      >
        <h2 className="font-family-script text-white text-2xl md:text-3xl text-center">Transactions</h2>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center justify-end gap-4 px-4 md:px-8 lg:px-12 py-3 md:py-4 relative z-10">
        <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-gold font-family-script md:text-lg hover:text-gold-light transition-colors">
          Filter <FaFilter size={14} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} className="text-gold hover:text-gold-light transition-colors">
          <FaBars size={18} />
        </motion.button>
      </div>

      {/* Transaction List */}
      <div className="px-4 md:px-8 lg:px-12 space-y-3 md:space-y-4 md:grid md:grid-cols-2 md:gap-4 relative z-10">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-center gap-3 md:gap-4 glass-card rounded-xl p-3 md:p-4 hover:border-gold/20 transition-all cursor-pointer"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "debit" ? "bg-blue-500/15 border border-blue-500/30" : "bg-green-500/15 border border-green-500/30"}`}>
              {tx.type === "debit" ? (
                <FaArrowUp className="text-blue-400" size={16} />
              ) : (
                <FaArrowDown className="text-green-400" size={16} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-family-script text-white text-sm md:text-base truncate">{tx.title}</p>
              <p className="font-family-script text-gray-400 text-xs md:text-sm">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-family-script text-sm md:text-base font-semibold ${tx.type === "debit" ? "text-red-400" : "text-green-400"}`}>
                {tx.amount}
              </p>
              <p className="font-family-script text-gray-400 text-xs md:text-sm">{tx.balance}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
