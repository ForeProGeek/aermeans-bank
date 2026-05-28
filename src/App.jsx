import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./screens/SplashScreen";
import AuthScreen from "./screens/AuthScreen";
import PinLoginScreen from "./screens/PinLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import UsdtWalletScreen from "./screens/UsdtWalletScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SupportScreen from "./screens/SupportScreen";
import { getSession, refreshSession, clearSession } from "./data/users";

function App() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  // Load theme
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

  // Check session after splash
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

  const handlePinSuccess = () => {
    setScreen("home");
  };

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showBottomNav = ["home", "transactions", "usdt", "support", "profile"].includes(screen);

  // Refresh user data when navigating
  useEffect(() => {
    if (user) {
      const fresh = refreshSession();
      if (fresh) setUser(fresh);
    }
  }, [screen]);

  return (
    <div className="h-screen w-full bg-desktop flex items-center justify-center p-4">
      {/* Phone frame on desktop, full width on mobile */}
      <div className="w-full max-w-md h-full md:h-[90vh] md:rounded-[2.5rem] md:border-[8px] md:border-navy-800 md:shadow-2xl md:shadow-black/50 overflow-hidden relative bg-navy-900">
        {screen === "splash" && <SplashScreen onFinish={handleSplashFinish} />}
        {screen === "auth" && <AuthScreen onAuthSuccess={handleAuthSuccess} />}
        {screen === "pin" && <PinLoginScreen onLogin={handlePinSuccess} />}
        {screen === "home" && <HomeScreen user={user} onNavigate={handleNavigate} />}
        {screen === "transactions" && <TransactionsScreen />}
        {screen === "usdt" && <UsdtWalletScreen />}
        {screen === "profile" && (
          <ProfileScreen
            user={user}
            onBack={() => handleNavigate("home")}
            onLogout={handleLogout}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
        {screen === "support" && <SupportScreen />}

        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}

export default App;
