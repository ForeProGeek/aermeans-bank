import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./screens/SplashScreen";
import PinLoginScreen from "./screens/PinLoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import UsdtWalletScreen from "./screens/UsdtWalletScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SupportScreen from "./screens/SupportScreen";

function App() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aermeans-theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme class to root
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
    setScreen("pin");
  };

  const handleLogin = () => {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showBottomNav = ["home", "transactions", "usdt", "support", "profile"].includes(screen);

  return (
    <div className="h-full w-full max-w-md mx-auto bg-navy-900 relative overflow-hidden">
      {screen === "splash" && <SplashScreen onFinish={handleSplashFinish} />}
      {screen === "pin" && <PinLoginScreen onLogin={handleLogin} />}
      {screen === "home" && <HomeScreen onNavigate={handleNavigate} />}
      {screen === "transactions" && <TransactionsScreen />}
      {screen === "usdt" && <UsdtWalletScreen />}
      {screen === "profile" && (
        <ProfileScreen
          onBack={() => handleNavigate("home")}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {screen === "support" && <SupportScreen />}

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default App;
