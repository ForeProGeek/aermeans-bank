import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { signup, login } from "../data/users";

export default function AuthScreen({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login(loginUser, loginPass);
      setLoading(false);
      if (result.success) onAuthSuccess();
      else setError(result.error);
    }, 600);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
    if (pin.length !== 6) {
      setError("PIN must be exactly 6 digits");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup({ fullName, username, email, phone, password, pin });
      setLoading(false);
      if (result.success) onAuthSuccess();
      else setError(result.error);
    }, 600);
  };

  const inputClass =
    "w-full bg-navy-700 border border-navy-600 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors md:py-4 md:text-base";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-2xl flex items-center justify-center mb-3">
            <span className="text-navy-900 font-bold text-2xl md:text-3xl">æ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Aermeans</h1>
          <p className="text-gray-400 text-sm md:text-base mt-1">Experience Seamless Transactions</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-navy-700 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
              mode === "login" ? "bg-gold text-navy-900" : "text-gray-400 hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
              mode === "signup" ? "bg-gold text-navy-900" : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Username or Email" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className={inputClass} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 md:py-4 bg-gold rounded-xl text-navy-900 font-bold text-base md:text-lg hover:bg-gold-light transition-colors disabled:opacity-50">
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className={inputClass} required />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="number" placeholder="Create 6-digit PIN" value={pin} onChange={(e) => setPin(e.target.value.slice(0, 6))} className={inputClass} required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 md:py-4 bg-gold rounded-xl text-navy-900 font-bold text-base md:text-lg hover:bg-gold-light transition-colors disabled:opacity-50">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
