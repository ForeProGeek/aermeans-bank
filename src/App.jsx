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
import { refreshSession, clearSession } from "./data/users";

function App() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    if (user) {
      const fresh = refreshSession();
      if (fresh) setUser(fresh);
    }
  }, [screen]);

  return (
    <div className="min-h-screen w-full bg-navy-900">
      <div className="w-full max-w-6xl mx-auto min-h-screen relative">
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
