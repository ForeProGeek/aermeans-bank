import { useState } from "react";
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

  const showBottomNav = ["home", "transactions", "usdt", "support", "profile"].includes(screen);

  return (
    <div className="h-full w-full max-w-md mx-auto bg-navy-900 relative overflow-hidden">
      {screen === "splash" && <SplashScreen onFinish={handleSplashFinish} />}
      {screen === "pin" && <PinLoginScreen onLogin={handleLogin} />}
      {screen === "home" && <HomeScreen />}
      {screen === "transactions" && <TransactionsScreen />}
      {screen === "usdt" && <UsdtWalletScreen />}
      {screen === "profile" && <ProfileScreen onBack={() => setScreen("home")} />}
      {screen === "support" && <SupportScreen />}

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default App;
