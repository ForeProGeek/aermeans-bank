import { useState } from "react";
import { motion } from "framer-motion";
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
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all md:py-4 md:text-base";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px]" />

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gold rounded-2xl flex items-center justify-center mb-3 shadow-xl shadow-gold/20">
            <span className="text-navy-900 font-bold text-2xl md:text-3xl">æ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Aermeans</h1>
          <p className="text-gray-400 text-sm md:text-base mt-1">Experience Seamless Transactions</p>
        </motion.div>

        {/* Glass card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                mode === "login" ? "bg-gold text-navy-900 shadow-lg shadow-gold/20" : "text-gray-400 hover:text-white"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`flex-1 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                mode === "signup" ? "bg-gold text-navy-900 shadow-lg shadow-gold/20" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder="Username or Email" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className={inputClass} required />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className={inputClass} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors">
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </motion.div>
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full py-3.5 md:py-4 bg-gold rounded-xl text-navy-900 font-bold text-base md:text-lg hover:bg-gold-light transition-all disabled:opacity-50 animate-glow-pulse"
              >
                {loading ? "Logging in..." : "Log In"}
              </motion.button>
            </form>
          )}

          {/* Signup Form */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              {[
                { icon: FaUser, placeholder: "Full Name", value: fullName, onChange: setFullName, type: "text" },
                { icon: FaUser, placeholder: "Username", value: username, onChange: setUsername, type: "text" },
                { icon: FaEnvelope, placeholder: "Email", value: email, onChange: setEmail, type: "email" },
                { icon: FaPhone, placeholder: "Phone Number", value: phone, onChange: setPhone, type: "tel" },
                { icon: FaLock, placeholder: "Password", value: password, onChange: setPassword, type: showPassword ? "text" : "password" },
                { icon: FaLock, placeholder: "Confirm Password", value: confirmPass, onChange: setConfirmPass, type: "password" },
                { icon: FaLock, placeholder: "Create 6-digit PIN", value: pin, onChange: (v) => setPin(v.slice(0, 6)), type: "number" },
              ].map((field, i) => (
                <motion.div key={field.placeholder} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="relative">
                    <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={inputClass}
                      required
                    />
                    {field.placeholder === "Password" && (
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors">
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full py-3.5 md:py-4 bg-gold rounded-xl text-navy-900 font-bold text-base md:text-lg hover:bg-gold-light transition-all disabled:opacity-50 animate-glow-pulse"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
