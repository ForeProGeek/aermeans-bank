import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "./components/BottomNav";
import LandingScreen from "./screens/LandingScreen";
import SplashScreen from "./screens/SplashScreen";
import AuthScreen from "./screens/AuthScreen";
import PinLoginScreen from "./screens/PinLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import UsdtWalletScreen from "./screens/UsdtWalletScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SupportScreen from "./screens/SupportScreen";
import { refreshSession, clearSession } from "./data/users";

const screenVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -30, scale: 0.98 },
};

function App() {
  const [screen, setScreen] = useState("landing");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const session = refreshSession();
      if (session) {
        setUser(session);
        setScreen("pin");
      } else {
        setScreen("splash");
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("aermeans-theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
    localStorage.setItem("aermeans-theme", theme);
  }, [theme]);

  const handleGetStarted = () => setScreen("splash");

  const handleSplashFinish = () => {
    const session = refreshSession();
    if (session) {
      setUser(session);
      setScreen("pin");
    } else {
      setScreen("auth");
    }
  };

  const handleAuthSuccess = () => {
    const session = refreshSession();
    setUser(session);
    setScreen("pin");
  };

  const handlePinSuccess = () => setScreen("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const handleNavigate = (target) => {
    if (["home", "transactions", "usdt", "support"].includes(target)) {
      setActiveTab(target);
    }
    setScreen(target);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setScreen("auth");
  };

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const showBottomNav = ["home", "transactions", "usdt", "support", "profile"].includes(screen);

  useEffect(() => {
    if (user) {
      const fresh = refreshSession();
      if (fresh) setUser(fresh);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case "landing": return <LandingScreen onGetStarted={handleGetStarted} />;
      case "splash": return <SplashScreen onFinish={handleSplashFinish} />;
      case "auth": return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
      case "pin": return <PinLoginScreen onLogin={handlePinSuccess} />;
      case "home": return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case "transactions": return <TransactionsScreen />;
      case "usdt": return <UsdtWalletScreen />;
      case "profile": return (
        <ProfileScreen
          user={user}
          onBack={() => handleNavigate("home")}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
      case "support": return <SupportScreen />;
      default: return <LandingScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-navy-900 relative overflow-hidden">
      {/* Global ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="w-full min-h-screen"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {showBottomNav && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}
      </div>
    </div>
  );
}

export default App;
