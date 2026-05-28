import { FaSyncAlt, FaWallet } from "react-icons/fa";

export default function UsdtWalletScreen() {
  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="px-4 py-4">
        <h2 className="font-family-script text-white text-2xl text-center">USDT Wallet</h2>
      </div>

      {/* Balance Card */}
      <div className="mx-4 mb-5 rounded-2xl bg-navy-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-family-script text-gray-300">USDT Balance</span>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaSyncAlt size={18} />
          </button>
        </div>
        <p className="text-4xl font-bold text-white mb-4">$0.00</p>
        <div className="flex items-center justify-between">
          <span className="font-family-script text-gray-400 text-sm">TRC-20</span>
          <button className="flex items-center gap-2 px-5 py-2 bg-gold rounded-full text-navy-900 font-semibold text-sm">
            <FaWallet size={14} /> Withdraw
          </button>
        </div>
      </div>

      {/* Generate Address Button */}
      <div className="mx-4 mb-6">
        <button className="w-full py-4 bg-gold rounded-2xl text-navy-900 font-family-script font-semibold text-lg">
          Tap to Generate Deposit Address
        </button>
      </div>

      {/* Recent Deposits */}
      <div className="px-4">
        <h3 className="font-family-script text-white text-xl mb-4">Recent Deposits</h3>
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="font-family-script text-lg">No recent deposits found.</p>
        </div>
      </div>
    </div>
  );
}
