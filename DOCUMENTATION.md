# Aermeans Bank App — Complete Code Documentation

> A mobile-first fintech web application built with **React + Vite + Tailwind CSS v4 + Framer Motion**. Features a desktop-only marketing landing page, user authentication, PIN login, unique account number generation, wallet dashboard, transaction history, USDT crypto wallet, profile management, and customer support — all with premium animations and visual flair.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Entry Points](#3-entry-points)
4. [Core Router (App.jsx)](#4-core-router-appjsx)
5. [State & Data Layer](#5-state--data-layer)
6. [Screen Components](#6-screen-components)
7. [Shared Components](#7-shared-components)
8. [Styling, Theme & Animations](#8-styling-theme--animations)
9. [Authentication Flow](#9-authentication-flow)
10. [Responsive Design Strategy](#10-responsive-design-strategy)
11. [Desktop-Only Landing Page](#11-desktop-only-landing-page)
12. [LocalStorage Schema](#12-localstorage-schema)
13. [How to Run & Extend](#13-how-to-run--extend)

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Bundler** | Vite | Fast dev server, HMR, optimized production builds |
| **Framework** | React 19 | Component-based UI architecture |
| **Styling** | Tailwind CSS v4 | Utility-first responsive styling with `@theme` |
| **PostCSS** | `@tailwindcss/postcss` | Tailwind v4 PostCSS plugin |
| **Animations** | Framer Motion | Screen transitions, scroll reveals, hover effects, gestures |
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
├── DOCUMENTATION.md              # This file
├── src/
│   ├── main.jsx                  # React root renderer
│   ├── App.jsx                   # Main router, global state, screen transitions
│   ├── index.css                 # Tailwind v4 theme + custom animations
│   ├── data/
│   │   └── users.js              # User CRUD, auth, account number generator
│   ├── components/
│   │   └── BottomNav.jsx         # Bottom tab navigation with flair
│   └── screens/
│       ├── LandingScreen.jsx     # Desktop-only marketing page with animations
│       ├── SplashScreen.jsx      # Branded splash with particles & loading bar
│       ├── AuthScreen.jsx        # Login + Signup with glassmorphism
│       ├── PinLoginScreen.jsx    # 6-digit PIN keypad with animated dots
│       ├── HomeScreen.jsx        # Dashboard with glass cards & glow effects
│       ├── TransactionsScreen.jsx# Animated transaction list with hover effects
│       ├── UsdtWalletScreen.jsx  # Crypto wallet with glowing CTAs
│       ├── ProfileScreen.jsx     # User profile with staggered menu animations
│       └── SupportScreen.jsx     # Support options with glass cards
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
- **StrictMode** — helps detect potential problems
- Imports `index.css` globally so Tailwind utilities are available everywhere

---

## 4. Core Router (`App.jsx`)

`App.jsx` is the **single source of truth** for the entire application's screen state. There is no React Router — navigation is handled by conditional rendering within `AnimatePresence` for smooth transitions.

### State Variables

```jsx
const [screen, setScreen] = useState("landing");      // Current visible screen
const [activeTab, setActiveTab] = useState("home");   // Bottom nav active tab
const [theme, setTheme] = useState("dark");           // "dark" | "light"
const [user, setUser] = useState(null);               // Logged-in user object
```

### Screen Values
| Value | Meaning |
|-------|---------|
| `"landing"` | Desktop marketing page (skipped on mobile) |
| `"splash"` | Loading/splash screen |
| `"auth"` | Login or Signup form |
| `"pin"` | 6-digit PIN verification |
| `"home"` | Main dashboard |
| `"transactions"` | Transaction history |
| `"usdt"` | USDT crypto wallet |
| `"profile"` | User profile & settings |
| `"support"` | Help & contact options |

### Mobile Detection — Skip Landing

```jsx
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    const session = refreshSession();
    if (session) { setUser(session); setScreen("pin"); }
    else { setScreen("splash"); }
  }
}, []);
```

- On mount: checks screen width
- **Mobile (< 768px)**: Skips landing page entirely — goes straight to Splash → Auth/PIN
- **Desktop (≥ 768px)**: Shows the full marketing landing page first

### Screen Transitions with Framer Motion

```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={screen}
    initial={{ opacity: 0, x: 30, scale: 0.98 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -30, scale: 0.98 }}
    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
  >
    {renderScreen()}
  </motion.div>
</AnimatePresence>
```

- `AnimatePresence` handles enter/exit animations when the screen changes
- `mode="wait"` — waits for exit animation to finish before entering
- Screens slide in from right, slide out to left, with a subtle scale effect
- `key={screen}` — React uses this to detect screen changes and trigger animations

### Global Ambient Glow

```jsx
<div className="fixed inset-0 pointer-events-none z-0">
  <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px]" />
  <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
</div>
```

- Fixed position, behind all content (`z-0`)
- Giant blurred orbs create ambient lighting on every screen
- Blue on top-left, gold on bottom-right

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
- Keeps the session in sync if user data changes

---

## 6. Screen Components

### `LandingScreen.jsx` — Desktop-Only Marketing Page

**Purpose:** Premium marketing landing page that only appears on desktop (≥ 768px). Mobile users skip this entirely.

#### Key Features
| Feature | Implementation |
|---------|---------------|
| **Animated background** | Giant blurred glow orbs (blue, gold, purple) with `animate-pulse` |
| **Floating particles** | 20 gold particles with `animate-float` CSS animation |
| **Grid overlay** | Subtle 60px grid lines at 3% opacity for tech aesthetic |
| **Animated counters** | `AnimatedCounter` component counts up from 0 using `useInView` |
| **Glassmorphism cards** | `glass-card` class: `backdrop-filter: blur(12px)` + translucent border |
| **Scroll animations** | Every section uses `motion.div` with `whileInView` fade-up |
| **Gradient text** | `bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent` |
| **Glowing CTAs** | Gold buttons with `shadow-xl shadow-gold/20` and `animate-glow-pulse` |
| **Staggered features** | 6 feature cards animate in with increasing delay |
| **Testimonials** | Quote cards with giant decorative quotation marks |
| **Trust badges** | Security & compliance icons in a row |

#### `AnimatedCounter` Component
```jsx
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += target / 125;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
```

- Uses `framer-motion`'s `useInView` to start counting only when visible
- Runs for ~2 seconds at 60fps (16ms intervals)

---

### `SplashScreen.jsx`

**Purpose:** Branded loading screen with premium animations.

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

- **Background orbs:** Blue, gold, cyan pulsing at different delays
- **Floating particles:** 15 white particles with randomized positions and durations
- **Staggered content:** Headline → Logo → Avatar animate in sequence
- **Loading bar:** Gold gradient bar at bottom animates width from 0% to 100% over 2.5s
- **Bouncing avatar:** `animate-bounce-soft` on the emoji

---

### `AuthScreen.jsx`

**Purpose:** Dual-mode authentication with glassmorphism design.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Blue + gold glow orbs + floating particles |
| Form container | `glass-card`: frosted glass with `backdrop-blur` |
| Tab buttons | Active tab gets gold background + `shadow-gold/20` |
| Input fields | `bg-white/5 border-white/10`, glow gold on focus |
| CTA button | `animate-glow-pulse`: pulsating gold shadow |
| Form inputs | Staggered entrance: each field slides in from left |
| Error message | `motion.div` fades in with `y: -10` |

---

### `PinLoginScreen.jsx`

**Purpose:** 6-digit PIN keypad with animated visual feedback.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Gold + blue ambient glow orbs |
| Avatar | Glowing gold blur behind the user icon |
| PIN dots | `motion.div` with `animate={{ scale: 1.2 }}` when filled |
| Error shake | `animate-shake` class triggers left-right wobble |
| Keypad buttons | `bg-white/5 border-white/10`, glass effect |
| Button tap | `whileTap={{ scale: 0.9 }}` on every key |
| Staggered keys | Numbers animate in with `delay: i * 0.03` |
| Backspace | Red button with `hover:shadow-red-500/30` |

---

### `HomeScreen.jsx`

**Purpose:** Main dashboard with glassmorphism cards and glow effects.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background glows | Blue + gold ambient orbs |
| Header buttons | `bg-white/5 border-white/10`, gold on hover |
| Notification dot | `animate-pulse` on the red badge |
| **Balance card** | Blue gradient with pink/purple decorative orbs |
| **Account card** | Gold gradient background `rgba(201,162,39,0.15)` with gold border |
| Quick actions | `glass-card` container, gold border glow on hover |
| Service icons | `group-hover:scale-110` with `shadow-lg` |
| SMS banner | `glass-card` with social icons that `hover:scale-1.2` |

---

### `TransactionsScreen.jsx`

**Purpose:** Scrollable transaction list with animated cards.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Blue ambient glow orb |
| Transaction cards | `glass-card` with translucent border |
| Hover effect | `whileHover={{ scale: 1.02, x: 4 }}` — card lifts and shifts right |
| Icon containers | Colored borders: blue for debit, green for credit |
| Staggered list | Each row animates in with `delay: i * 0.05` |

---

### `UsdtWalletScreen.jsx`

**Purpose:** Cryptocurrency wallet with glowing elements.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Gold + blue ambient glow orbs |
| Balance card | Dark gradient with gold border and inner glow orb |
| **Withdraw button** | `animate-glow-pulse` — pulsating gold shadow |
| Generate Address CTA | Gold gradient with `animate-glow-pulse` |
| Empty state | 💸 emoji bounces with `animate={{ y: [0, -10, 0] }}` infinite loop |

---

### `ProfileScreen.jsx`

**Purpose:** User profile with animated menu and glowing elements.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Blue ambient glow orb |
| Header card | Blue gradient with gold glow orb, `bg-gradient-to-br from-white/5` overlay |
| Avatar | `shadow-xl shadow-gold/30` + gold blur behind |
| Tier badge | Gold border with `bg-gold/10` |
| Menu items | Staggered entrance with `delay: i * 0.04` |
| Menu hover | `whileHover={{ x: 4 }}` — slides right |
| Menu icons | `group-hover:bg-gold/25 group-hover:border-gold/50` |

---

### `SupportScreen.jsx`

**Purpose:** Customer support with glassmorphism cards.

#### Visual Flair
| Element | Effect |
|---------|--------|
| Background | Blue ambient glow orb |
| Option cards | `glass-card` with rounded-2xl |
| Hover | `whileHover={{ scale: 1.02, x: 4 }}` |
| Icons | Gold border, hover fills with gold |
| Staggered entrance | Each card with `delay: 0.1 + i * 0.08` |

---

## 7. Shared Components

### `BottomNav.jsx`

**Purpose:** Fixed bottom navigation bar with premium active state.

```jsx
<nav className="fixed bottom-0 left-0 w-full bg-navy-800/90 backdrop-blur-lg border-t border-white/10 z-50">
```

| Feature | Implementation |
|---------|---------------|
| **Backdrop blur** | `backdrop-blur-lg` creates frosted glass effect |
| Active tab | Larger circle (`w-12 h-12`) with gold border + `shadow-gold/20` |
| Active motion | `animate={{ y: -2 }}` — subtle lift on active icon |
| Tap feedback | `whileTap={{ scale: 0.9 }}` on all tabs |

---

## 8. Styling, Theme & Animations

### `index.css`

#### Tailwind v4 Theme Declaration
```css
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

#### Custom Animations

| Animation | CSS | Used On |
|-----------|-----|---------|
| **Shake** | `@keyframes shake` | PIN error feedback |
| **Float** | `@keyframes float` | Landing page particles |
| **Float Slow** | `@keyframes float-slow` | Gentle bobbing elements |
| **Glow Pulse** | `@keyframes glow-pulse` | CTA buttons (pulsating gold shadow) |
| **Shimmer** | `@keyframes shimmer` | Loading skeleton effect |
| **Spin Slow** | `@keyframes spin-slow` | 20s rotation |
| **Bounce Soft** | `@keyframes bounce-soft` | Avatar emoji bounce |
| **Ripple** | `@keyframes ripple` | Expanding circle effect |

#### Utility Classes

| Class | Effect |
|-------|--------|
| `.glass-card` | `backdrop-filter: blur(12px)` + translucent border + subtle background |
| `.text-gradient-gold` | Gold-to-yellow gradient text |
| `.gradient-border` | Gold-to-blue animated gradient border |
| `.animate-glow-pulse` | Pulsating gold box-shadow |
| `.animate-float` | Upward floating particles |
| `.animate-shake` | Error shake |

#### Light Mode Overrides
```css
html.light-mode .bg-navy-900 { background-color: #f0f4f8; }
html.light-mode .bg-navy-700 { background-color: #ffffff; }
html.light-mode .text-white { color: #1a202c; }
```

---

## 9. Authentication Flow

```
Desktop:  Landing → Get Started → Splash → Auth → PIN → Home
Mobile:   Splash → Auth/PIN → Home (skips landing)
```

### Signup Flow
1. User fills signup form (name, username, email, phone, password, PIN)
2. `signup()` validates uniqueness, generates account number
3. User saved to `localStorage`, session set
4. Auto-navigates to PIN screen
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

// Padding
<div className="px-4 md:px-8">...</div>

// Grid layouts
<div className="md:grid md:grid-cols-2 md:gap-6">

// Button sizing
<button className="w-16 h-16 md:w-20 md:h-20">1</button>
```

### Screen-Specific Responsive Behavior

| Screen | Mobile | Desktop (md+) |
|--------|--------|---------------|
| **Landing** | Not shown (skipped) | Full marketing page with all animations |
| **Auth** | Full-width form | Centered form with larger inputs |
| **PIN** | Compact keypad | Larger buttons, centered |
| **Home** | Stacked cards | 2-column grid |
| **Transactions** | Single column | 2-column card grid |
| **USDT** | Stacked | 2-column layout |
| **Profile** | Single column | 2-column menu grid |
| **Support** | Single column | 2-column options grid |

---

## 11. Desktop-Only Landing Page

The landing page is **intentionally desktop-only**:

```jsx
// App.jsx
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    setScreen("splash");  // Skip landing on mobile
  }
}, []);
```

**Rationale:**
- Landing pages are marketing tools best experienced on larger screens
- Mobile users want to get straight into the app (Splash → Auth → PIN → Home)
- The landing page is content-heavy (stats, features, testimonials, CTAs) which works better on desktop

The landing page includes:
- Animated background with floating particles and glow orbs
- Stats bar with animated counters (50K+ users, ₦2B+ transacted, 99% uptime)
- 6 feature cards with glassmorphism and hover effects
- 3-step "How It Works" with gold diamond badges
- 3 testimonial quote cards
- Trust badges (Encryption, Fraud, CBN, NDPR, ISO)
- Final CTA with glowing button

---

## 12. LocalStorage Schema

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

## 13. How to Run & Extend

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
2. Add import in `App.jsx`
3. Add case in `renderScreen()` switch statement
4. Add navigation:
   ```jsx
   <button onClick={() => setScreen("newscreen")}>Go</button>
   ```
5. Add Framer Motion entrance animation:
   ```jsx
   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
   ```

### Adding Flair to a New Component

Use these patterns consistently:

```jsx
// Glassmorphism card
<div className="glass-card rounded-2xl p-6">

// Background glow
<div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]" />

// Staggered entrance
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

// Hover effect
<motion.button whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>

// Glowing button
<button className="animate-glow-pulse bg-gold ...">

// Gradient text
<span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
```

### Connecting to a Real Backend

Replace `src/data/users.js` with API calls:

```js
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
| Screen Components | 8 | Landing, Splash, Auth, PIN, Home, Transactions, USDT, Profile, Support |
| Shared Components | 1 | `BottomNav.jsx` |
| Documentation | 1 | `DOCUMENTATION.md` |
| **Total Source** | **16** | |

---

*Documentation generated for Aermeans Bank App v1.5*
