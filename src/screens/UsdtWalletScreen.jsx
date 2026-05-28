import { FaSyncAlt, FaWallet } from "react-icons/fa";

export default function UsdtWalletScreen() {
  return (
    <div className="min-h-screen pb-24 md:pb-28">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <h2 className="font-family-script text-white text-2xl md:text-3xl text-center">USDT Wallet</h2>
      </div>

      <div className="px-4 md:px-8 lg:px-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        {/* Balance Card */}
        <div className="mb-5 md:mb-0 rounded-2xl bg-navy-700 p-5 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <span className="font-family-script text-gray-300 md:text-lg">USDT Balance</span>
            <button className="text-gray-400 hover:text-white transition-colors">
              <FaSyncAlt size={18} />
            </button>
          </div>
          <p className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">$0.00</p>
          <div className="flex items-center justify-between">
            <span className="font-family-script text-gray-400 text-sm md:text-base">TRC-20</span>
            <button className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gold rounded-full text-navy-900 font-semibold text-sm md:text-base hover:bg-gold-light transition-colors">
              <FaWallet size={14} /> Withdraw
            </button>
          </div>
        </div>

        <div>
          {/* Generate Address Button */}
          <div className="mb-6">
            <button className="w-full py-4 md:py-5 bg-gold rounded-2xl text-navy-900 font-family-script font-semibold text-lg md:text-xl hover:bg-gold-light transition-colors">
              Tap to Generate Deposit Address
            </button>
          </div>

          {/* Recent Deposits */}
          <div>
            <h3 className="font-family-script text-white text-xl md:text-2xl mb-4">Recent Deposits</h3>
            <div className="flex flex-col items-center justify-center py-16 md:py-24 text-gray-500">
              <p className="font-family-script text-lg md:text-xl">No recent deposits found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
