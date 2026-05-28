const USERS_KEY = "aermeans_users";
const SESSION_KEY = "aermeans_session";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function generateAccountNumber() {
  const users = getUsers();
  let num;
  do {
    num = "3" + Math.floor(Math.random() * 1000000000).toString().padStart(9, "0");
  } while (users.some((u) => u.accountNumber === num));
  return num;
}

export function signup({ fullName, username, email, phone, password, pin }) {
  const users = getUsers();

  if (users.some((u) => u.username === username)) {
    return { success: false, error: "Username already taken" };
  }
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }

  const newUser = {
    id: crypto.randomUUID?.() || Date.now().toString(),
    fullName,
    username,
    email,
    phone,
    password,
    pin,
    accountNumber: generateAccountNumber(),
    bankName: "Nombank(Amucha) MFB",
    balance: 0.61,
    joinedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    tier: "REGULAR",
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);
  return { success: true, user: newUser };
}

export function login(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => (u.username === username || u.email === username) && u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid username or password" };
  }

  setSession(user);
  return { success: true, user };
}

export function refreshSession() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find((u) => u.id === session.id) || null;
}
