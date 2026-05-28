# Aermeans Bank App — Complete Code Documentation

> A mobile-first fintech web application built with **React + Vite + Tailwind CSS v4**. Features user authentication, PIN login, unique account number generation, wallet dashboard, transaction history, USDT crypto wallet, profile management, and customer support.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Entry Points](#3-entry-points)
4. [Core Router (App.jsx)](#4-core-router-appjsx)
5. [State & Data Layer](#5-state--data-layer)
6. [Screen Components](#6-screen-components)
7. [Shared Components](#7-shared-components)
8. [Styling & Theme](#8-styling--theme)
9. [Authentication Flow](#9-authentication-flow)
10. [Responsive Design Strategy](#10-responsive-design-strategy)
11. [LocalStorage Schema](#11-localstorage-schema)
12. [How to Run & Extend](#12-how-to-run--extend)

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Bundler** | Vite | Fast dev server, HMR, optimized production builds |
| **Framework** | React 19 | Component-based UI architecture |
| **Styling** | Tailwind CSS v4 | Utility-first responsive styling with `@theme` |
| **PostCSS** | `@tailwindcss/postcss` | Tailwind v4 PostCSS plugin |
| **Icons** | `react-icons/fa` | FontAwesome icons throughout the app |
| **Fonts** | Google Fonts (Inter, Dancing Script, Pacifico) | Body text + script headings |
| **Persistence** | `localStorage` | User data, session, theme preference |

---

## 2. Project Structure

```
aermeans-bank/
├── index.html                    # HTML entry point + Google Fonts
├── postcss.config.js             # PostCSS config for Tailwind v4
├── package.json                  # Dependencies & scripts
├── src/
│   ├── main.jsx                  # React root renderer
│   ├── App.jsx                   # Main router & global state
│   ├── index.css                 # Tailwind v4 theme + custom styles
│   ├── data/
│   │   └── users.js              # User CRUD, auth, account number generator
│   ├── components/
│   │   └── BottomNav.jsx         # Bottom tab navigation bar
│   └── screens/
│       ├── SplashScreen.jsx      # Branded splash/loading screen
│       ├── AuthScreen.jsx        # Login + Signup forms
│       ├── PinLoginScreen.jsx    # 6-digit PIN keypad
│       ├── HomeScreen.jsx        # Dashboard (balance, services)
│       ├── TransactionsScreen.jsx# Transaction history list
│       ├── UsdtWalletScreen.jsx  # Crypto wallet (USDT TRC-20)
│       ├── ProfileScreen.jsx     # User profile + settings menu
│       └── SupportScreen.jsx     # Customer support options
```

---

## 3. Entry Points

### `index.html`

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

- Sets viewport to prevent zooming on mobile devices (common for banking apps)
- Loads **Google Fonts**: Inter (body), Dancing Script (script headings), Pacifico (logo accent)
- The `div#root` is where React mounts the entire application tree

### `src/main.jsx`

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- **React 19 `createRoot`** API — the modern way to render React apps
- **StrictMode** — helps detect potential problems (double-renders in dev, deprecated API warnings)
- Imports `index.css` globally so Tailwind utilities are available everywhere
- Mounts `<App />` into the DOM

---

## 4. Core Router (`App.jsx`)

`App.jsx` is the **single source of truth** for the entire application's screen state. There is no React Router — navigation is handled by conditional rendering based on a `screen` state string.

### State Variables

```jsx
const [screen, setScreen] = useState("splash");      // Current visible screen
const [activeTab, setActiveTab] = useState("home");   // Bottom nav active tab
const [theme, setTheme] = useState("dark");           // "dark" | "light"
const [user, setUser] = useState(null);               // Logged-in user object
```

### Screen Values
| Value | Meaning |
|-------|---------|
| `"splash"` | Loading/splash screen |
| `"auth"` | Login or Signup form |
| `"pin"` | 6-digit PIN verification |
| `"home"` | Main dashboard |
| `"transactions"` | Transaction history |
| `"usdt"` | USDT crypto wallet |
| `"profile"` | User profile & settings |
| `"support"` | Help & contact options |

### Theme Effect

```jsx
useEffect(() => {
  const root = document.documentElement;
  theme === "light" ? root.classList.add("light-mode") : root.classList.remove("light-mode");
  localStorage.setItem("aermeans-theme", theme);
}, [theme]);
```

- Toggles a `.light-mode` class on the `<html>` element
- CSS rules prefixed with `html.light-mode` override dark colors
- Persists choice to `localStorage`

### Auth Check on Splash Finish

```jsx
const handleSplashFinish = () => {
  const session = refreshSession();
  if (session) { setUser(session); setScreen("pin"); }
  else { setScreen("auth"); }
};
```

- After the splash animation ends, checks if a user session exists in `localStorage`
- **Has session** → go to PIN screen
- **No session** → go to Login/Signup

### Navigation Handlers

```jsx
const handleNavigate = (target) => {
  if (["home", "transactions", "usdt", "support"].includes(target)) {
    setActiveTab(target);   // Highlight correct bottom nav tab
  }
  setScreen(target);         // Render the target screen
};
```

- `handleNavigate("profile")` — called from Home's hamburger menu
- `handleTabChange("transactions")` — called from BottomNav

### Logout Flow

```jsx
const handleLogout = () => {
  clearSession();      // Removes aermeans_session from localStorage
  setUser(null);
  setScreen("auth");   // Back to login
};
```

### Layout Container

```jsx
<div className="min-h-screen w-full bg-navy-900">
  <div className="w-full max-w-6xl mx-auto min-h-screen relative">
```

- Outer: full viewport, dark navy background
- Inner: content capped at `max-w-6xl` (1152px), centered with `mx-auto`
- This makes the app look good on both mobile (full width) and desktop (centered content)

---

## 5. State & Data Layer

### `src/data/users.js`

This is the **entire backend** of the app. No server, no database — just `localStorage`.

#### Constants

```js
const USERS_KEY = "aermeans_users";      // Array of all registered users
const SESSION_KEY = "aermeans_session";  // Currently logged-in user
```

#### `getUsers() / saveUsers()`

```js
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
```

- Safely parses the users array from localStorage
- Returns `[]` if nothing exists or JSON is corrupted

#### `generateAccountNumber()`

```js
function generateAccountNumber() {
  const users = getUsers();
  let num;
  do {
    num = "3" + Math.floor(Math.random() * 1000000000).toString().padStart(9, "0");
  } while (users.some((u) => u.accountNumber === num));
  return num;
}
```

- Generates a **10-digit number** starting with `3`
- Uses a `do...while` loop to guarantee uniqueness against existing users
- `padStart(9, "0")` ensures exactly 9 digits after the `3`

#### `signup({ fullName, username, email, phone, password, pin })`

```js
export function signup({ fullName, username, email, phone, password, pin }) {
  const users = getUsers();

  // Validation
  if (users.some((u) => u.username === username))
    return { success: false, error: "Username already taken" };
  if (users.some((u) => u.email === email))
    return { success: false, error: "Email already registered" };

  const newUser = {
    id: crypto.randomUUID?.() || Date.now().toString(),
    fullName, username, email, phone, password, pin,
    accountNumber: generateAccountNumber(),
    bankName: "Nombank(Amucha) MFB",
    balance: 0.61,
    joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    tier: "REGULAR",
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);
  return { success: true, user: newUser };
}
```

- Checks for duplicate username and email
- Creates a complete user object with auto-generated account number, default balance ₦0.61, and "REGULAR" tier
- Uses `crypto.randomUUID()` (modern browsers) or falls back to `Date.now()`
- Saves to localStorage and sets the session

#### `login(username, password)`

```js
export function login(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => (u.username === username || u.email === username) && u.password === password
  );
  if (!user) return { success: false, error: "Invalid username or password" };
  setSession(user);
  return { success: true, user };
}
```

- Allows login with **either username OR email**
- Plain-text password comparison (this is a demo app — real apps use bcrypt/hashing)

#### `refreshSession()`

```js
export function refreshSession() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find((u) => u.id === session.id) || null;
}
```

- Re-fetches the latest user data from the users array
- This keeps the session in sync if user data changes (e.g., balance updates)

---

## 6. Screen Components

### `SplashScreen.jsx`

**Purpose:** Branded loading screen that auto-navigates after 2.5 seconds.

```jsx
useEffect(() => {
  const timer = setTimeout(() => onFinish(), 2500);
  return () => clearTimeout(timer);
}, [onFinish]);
```

- `useEffect` with cleanup: cancels the timer if the component unmounts early
- SVG wave decorations at top and bottom for visual polish
- Responsive: `text-4xl md:text-6xl` scales the headline on desktop

### `AuthScreen.jsx`

**Purpose:** Dual-mode authentication (Login / Signup) with form validation.

#### State
```jsx
const [mode, setMode] = useState("login");          // Toggle between forms
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
```

#### Signup Validation
```js
if (password !== confirmPass) {
  setError("Passwords do not match");
  return;
}
if (pin.length !== 6) {
  setError("PIN must be exactly 6 digits");
  return;
}
```

- Password match check
- PIN must be exactly 6 digits
- `setTimeout(..., 600)` simulates network latency for realism

#### Form Input Pattern
```jsx
<div className="relative">
  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
  <input type="text" placeholder="Full Name" ... className={inputClass} required />
</div>
```

- Icon absolutely positioned inside the input
- `pl-11` (padding-left) creates space for the icon
- All inputs use the same `inputClass` for consistency

### `PinLoginScreen.jsx`

**Purpose:** 6-digit PIN keypad with visual feedback and error animation.

#### PIN Logic
```jsx
const handleNumber = (num) => {
  if (pin.length < maxPinLength) {
    const newPin = pin + num;
    setPin(newPin);
    setError(false);
    if (newPin.length === maxPinLength) {
      setTimeout(() => {
        if (newPin === correctPin) onLogin();
        else { setError(true); setPin(""); }
      }, 200);
    }
  }
};
```

- Appends digits until 6 are entered
- On the 6th digit, validates against the user's stored PIN (`user.pin`)
- **Success** → calls `onLogin()` → Home screen
- **Failure** → triggers error state, clears PIN, shake animation plays

#### PIN Dots
```jsx
<div className={`flex items-center justify-center gap-4 ... ${error ? "animate-shake" : ""}`}>
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className={`w-4 h-4 rounded-full ... ${error ? "bg-red-500" : i < pin.length ? "bg-gold" : "bg-navy-500"}`} />
  ))}
</div>
```

- 6 circles that fill with gold as digits are entered
- Error state turns all dots red and triggers the `animate-shake` CSS animation

#### Number Pad Grid
```jsx
<div className="grid grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4 max-w-sm md:max-w-md mx-auto w-full">
```

- CSS Grid: 3 columns
- Mobile: `w-16 h-16` buttons
- Desktop: `w-20 h-20` buttons (via `md:w-20 md:h-20`)
- Fingerprint icon (decorative) and red backspace button

### `HomeScreen.jsx`

**Purpose:** Main dashboard with wallet balance, account details, quick actions, and service grid.

#### Props
```jsx
export default function HomeScreen({ user, onNavigate }) {
```

- `user`: The logged-in user object (from `App.jsx` state)
- `onNavigate`: Callback to change screens (e.g., to Profile)

#### Balance Card
```jsx
<div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-blue-800 p-5 md:p-6">
  <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/30 rounded-full -translate-y-1/2 translate-x-1/4"></div>
```

- Gradient background (`from-blue-600 to-blue-800`)
- Decorative pink/purple circles positioned absolutely for depth
- Eye icon toggles between `₦0.61` and `₦****`

#### Account Details Card
```jsx
<div className="rounded-xl bg-gold-dark/60 p-4 md:p-5">
  <div className="flex justify-between items-start">
    <div className="space-y-1 md:space-y-2">
      <p className="font-family-script text-gold-light text-sm">Account number</p>
      ...
    </div>
    <div className="text-right space-y-1 md:space-y-2">
      <p className="text-white text-sm font-medium">{accountNumber}</p>
      ...
    </div>
  </div>
</div>
```

- Gold-tinted card showing account number, name, and bank
- Two-column flex layout: labels left, values right

#### Services Grid
```jsx
<div className="grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-6">
  {services.map((service) => (
    <button key={service.label} className="flex flex-col items-center gap-2 md:gap-3 group">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${service.color} ... group-hover:scale-110 transition-transform`}>
        <service.icon className="text-white" size={20} md:size={24} />
      </div>
      <span className="font-family-script text-white text-[10px] md:text-xs">{service.label}</span>
    </button>
  ))}
</div>
```

- 4-column grid of service icons (Data, Airtime, Betting, etc.)
- Each has a unique color class (`bg-purple-500`, `bg-blue-500`, etc.)
- `group-hover:scale-110` adds a subtle zoom on hover

#### Responsive Layout
```jsx
<div className="px-4 md:px-8 md:grid md:grid-cols-2 md:gap-6">
```

- On mobile (`default`): single column, stacked cards
- On desktop (`md:`): 2-column grid — balance/account/actions on left, banner/services on right

### `TransactionsScreen.jsx`

**Purpose:** Scrollable list of all financial transactions with color-coded amounts.

```jsx
const transactions = [
  { id: 1, type: "debit", title: "MTN Data 500MB GIFTING...", date: "May 7, 2025 @8:42", amount: "-₦350.00", balance: "₦0.61" },
  ...
];
```

- Hardcoded demo data (in a real app, this would come from an API)
- **Debit** (outgoing): red text `text-red-400`, blue up-arrow icon
- **Credit** (incoming): green text `text-green-400`, green down-arrow icon

```jsx
<div className="px-4 md:px-8 md:grid md:grid-cols-2 md:gap-4">
```

- Mobile: single column list
- Desktop: 2-column card grid for better space usage

### `UsdtWalletScreen.jsx`

**Purpose:** Cryptocurrency wallet for USDT (TRC-20 network).

```jsx
<p className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">$0.00</p>
```

- Shows USDT balance in USD
- Network label: "TRC-20" (Tron blockchain)
- Yellow "Withdraw" button with wallet icon
- "Tap to Generate Deposit Address" CTA button

### `ProfileScreen.jsx`

**Purpose:** User profile with tier badge, settings menu, sign out, and theme toggle.

#### Header Card
```jsx
<div className="rounded-2xl bg-blue-700 p-4 md:p-6 flex items-center justify-between">
  <div className="flex items-center gap-3 md:gap-4">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full ...">
      <FaUser className="text-navy-900" size={24} />
    </div>
    <div>
      <h3 className="font-family-script text-white text-lg md:text-xl">{displayName}</h3>
      <p className="font-family-script text-gray-300 text-sm md:text-base">Username : {username}</p>
      <p className="font-family-script text-gray-300 text-sm md:text-base">Joined {joinedDate}</p>
    </div>
  </div>
  <span className="px-4 py-1.5 bg-navy-900 rounded-lg font-family-script text-white text-sm">{tier}</span>
</div>
```

- Blue card with gold avatar circle
- "REGULAR" tier badge (top-right)
- All text uses `font-family-script` (Dancing Script) to match the original app's cursive style

#### Menu Items
```jsx
const menuItems = [
  { icon: FaUser, label: "Profile" },
  { icon: FaCrown, label: "Account Tiers" },
  { icon: FaIdCard, label: "Add BVN / NIN" },
  ...
];
```

- 10 menu items mapped from an array
- Each has a gold-dark circular icon background
- Chevron arrow on the right
- Desktop: 2-column grid layout

#### Bottom Actions
```jsx
<button onClick={onLogout} className="flex items-center gap-2 text-red-400 font-family-script ...">
  <FaSignOutAlt size={16} /> Sign out
</button>
<button onClick={onToggleTheme} className="flex items-center gap-2 text-gray-400 font-family-script ...">
  {isLight ? <FaMoon size={16} /> : <FaSun size={16} />}
  {isLight ? "Dark" : "Light"}
</button>
```

- **Sign out**: calls `onLogout` → clears session → back to Auth
- **Theme toggle**: switches between sun (dark) and moon (light) icons

### `SupportScreen.jsx`

**Purpose:** Customer support contact options.

```jsx
const supportOptions = [
  { icon: FaClipboardList, title: "Check FAQs", subtitle: "Read our extensive help articles" },
  { icon: FaEnvelope, title: "Contact customer support through email", subtitle: "Seek help from our support team" },
  { icon: FaTelegram, title: "Join our Telegram Channel", subtitle: "you can easily join our Telegram Channel" },
  { icon: FaWhatsapp, title: "Message us on Whatsapp", subtitle: "Text us on Whatsapp and get immediate response" },
];
```

- 4 support channels mapped from data
- Each item has an icon, title (cursive), subtitle (gray), and chevron arrow
- Desktop: 2-column grid

---

## 7. Shared Components

### `BottomNav.jsx`

**Purpose:** Fixed bottom navigation bar with 4 tabs.

```jsx
const tabs = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "transactions", label: "Transactions", icon: FaExchangeAlt },
  { id: "usdt", label: "USDT", icon: FaMoneyBillWave },
  { id: "support", label: "Support", icon: FaHeadset },
];
```

#### Active State Design
```jsx
<div className={`flex items-center justify-center rounded-full transition-all duration-200 ${
  isActive ? "w-12 h-12 md:w-14 md:h-14 bg-navy-600 border-2 border-navy-900 shadow-lg" : "w-8 h-8 md:w-10 md:h-10"
}`}>
```

- Active tab: larger circle (`w-12 h-12`) with background + shadow, shifted up (`-mt-3`)
- Inactive tab: smaller, no background
- Desktop: tabs get more horizontal padding (`md:px-8`)

#### Fixed Positioning
```jsx
<nav className="fixed bottom-0 left-0 w-full bg-navy-800 border-t border-navy-600 z-50">
```

- `fixed` — stays at bottom while scrolling
- `z-50` — stays above all content
- `border-t` — subtle top border for separation

---

## 8. Styling & Theme

### `index.css`

#### Tailwind v4 Theme Declaration
```css
@import "tailwindcss";

@theme {
  --color-navy-900: #0a1628;
  --color-navy-800: #0f1f3d;
  --color-navy-700: #132242;
  --color-navy-600: #1a2d4d;
  --color-navy-500: #1e3a5f;
  --color-gold: #c9a227;
  --color-gold-light: #d4af37;
  --color-gold-dark: #5c4d1a;
  --color-gold-darker: #4a3d15;
  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-family-script: "Dancing Script", cursive;
  --font-family-pacifico: "Pacifico", cursive;
}
```

- Tailwind v4 uses `@theme` instead of `tailwind.config.js`
- Custom colors: navy scale (900→500) + gold scale
- Custom fonts: Inter for body, Dancing Script for cursive headings

#### Light Mode Overrides
```css
html.light-mode .bg-navy-900 { background-color: #f0f4f8; }
html.light-mode .bg-navy-700 { background-color: #ffffff; }
html.light-mode .text-white { color: #1a202c; }
```

- When `html` has `.light-mode` class, these override the dark theme
- Navy backgrounds become light grays/whites
- White text becomes dark text
- Cards and borders adjust accordingly

#### Custom Animations
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
```

- Applied to PIN dots when the wrong PIN is entered
- Quick left-right shake for 400ms

#### Scrollbar Hide Utility
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- Hides scrollbars across all browsers
- Used on scrollable containers for a cleaner mobile app look

---

## 9. Authentication Flow

```
┌─────────────┐     2.5s      ┌─────────────────┐
│   Splash    │ ────────────► │  Check Session  │
│   Screen    │               │   (localStorage)│
└─────────────┘               └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │ No session       │ Has session      │
                    ▼                  ▼                  │
            ┌──────────────┐    ┌──────────────┐         │
            │  AuthScreen  │    │ PinLoginScreen│         │
            │ (Login/Signup)│    │ (Verify PIN)  │         │
            └──────┬───────┘    └──────┬───────┘         │
                   │                    │                 │
         Login OK / Signup OK    PIN Correct             │
                   │                    │                 │
                   └───────────────────┼─────────────────┘
                                       ▼
                              ┌──────────────┐
                              │   HomeScreen │
                              │  (Dashboard) │
                              └──────────────┘
```

### Signup Flow
1. User fills signup form (name, username, email, phone, password, PIN)
2. `signup()` validates uniqueness, generates account number
3. User saved to `localStorage`, session set
4. Auto-navigates to PIN screen (to verify they remember their PIN)
5. PIN correct → Home

### Login Flow
1. User enters username/email + password
2. `login()` searches users array for match
3. Session saved to `localStorage`
4. Navigates to PIN screen
5. PIN correct → Home

### Logout Flow
1. User taps "Sign out" in Profile
2. `clearSession()` removes `aermeans_session`
3. App navigates to Auth screen

---

## 10. Responsive Design Strategy

The app uses **Tailwind's mobile-first responsive prefixes**:

| Prefix | Breakpoint | Usage |
|--------|-----------|-------|
| (none) | < 768px | Mobile — default styles |
| `md:` | ≥ 768px | Tablet/Desktop — overrides |

### Common Patterns

```jsx
// Text sizing
<h1 className="text-2xl md:text-3xl">Title</h1>
// Mobile: 24px | Desktop: 30px

// Padding
<div className="px-4 md:px-8">...</div>
// Mobile: 16px sides | Desktop: 32px sides

// Grid layouts
<div className="md:grid md:grid-cols-2 md:gap-6">
// Mobile: single column (stacked)
// Desktop: 2 columns with 24px gap

// Button sizing
<button className="w-16 h-16 md:w-20 md:h-20">1</button>
// Mobile: 64px | Desktop: 80px
```

### Screen-Specific Responsive Behavior

| Screen | Mobile | Desktop (md+) |
|--------|--------|---------------|
| **Auth** | Full-width form | Centered `max-w-lg` form |
| **PIN** | Compact keypad | Larger buttons, centered |
| **Home** | Stacked cards | 2-column grid layout |
| **Transactions** | Single column | 2-column card grid |
| **Profile** | Single column menu | 2-column menu grid |
| **Support** | Single column | 2-column options grid |
| **BottomNav** | Compact tabs | Wider tabs, bigger active bubble |

---

## 11. LocalStorage Schema

### `aermeans_users`
```json
[
  {
    "id": "uuid-string",
    "fullName": "Joshua Agboola",
    "username": "joshua",
    "email": "joshua@email.com",
    "phone": "08012345678",
    "password": "123456",
    "pin": "123456",
    "accountNumber": "3123456789",
    "bankName": "Nombank(Amucha) MFB",
    "balance": 0.61,
    "joinedDate": "Nov 11, 2024",
    "tier": "REGULAR"
  }
]
```

### `aermeans_session`
```json
{
  "id": "uuid-string",
  "fullName": "Joshua Agboola",
  "username": "joshua",
  ...
}
```

### `aermeans_theme`
```json
"dark"
```

---

## 12. How to Run & Extend

### Run Locally
```bash
cd aermeans-bank
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

Output goes to `dist/` folder. Deploy `dist/` to Vercel, Netlify, or GitHub Pages.

### Adding a New Screen

1. Create `src/screens/NewScreen.jsx`
2. Add a new state value in `App.jsx`: `const [screen, setScreen] = useState(...)`
3. Add conditional rendering:
   ```jsx
   {screen === "newscreen" && <NewScreen />}
   ```
4. Add navigation:
   ```jsx
   <button onClick={() => setScreen("newscreen")}>Go</button>
   ```

### Adding a New Service to Home

```js
// In HomeScreen.jsx
const services = [
  ...existing services,
  { icon: FaNewIcon, label: "New Service", color: "bg-teal-500" },
];
```

### Connecting to a Real Backend

Replace `src/data/users.js` with API calls:

```js
// Instead of localStorage:
export async function signup(data) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

### Security Notes (For Production)

| Current (Demo) | Production Should |
|----------------|-------------------|
| Plain-text passwords | Hash with bcrypt/argon2 |
| Plain-text PIN | Hash PIN server-side |
| localStorage session | HTTP-only cookies + JWT |
| No HTTPS requirement | Enforce HTTPS |
| Client-side validation only | Server-side validation |
| No rate limiting | Implement rate limiting |

---

## File Count Summary

| Category | Count | Files |
|----------|-------|-------|
| Entry/Config | 4 | `index.html`, `main.jsx`, `index.css`, `postcss.config.js` |
| Router/State | 1 | `App.jsx` |
| Data Layer | 1 | `users.js` |
| Screen Components | 7 | Splash, Auth, PIN, Home, Transactions, USDT, Profile, Support |
| Shared Components | 1 | `BottomNav.jsx` |
| **Total Source** | **14** | |

---

*Documentation generated for Aermeans Bank App v1.0*
