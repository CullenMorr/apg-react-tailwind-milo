const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;
const DEV_TOKEN = process.env.TOKEN;

// Get CSRF token from Laravel
export const initSanctum = async () => {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: "include", // ensures cookies are sent
  });
};

// Login using Laravel Sanctum
export const login = async (email: string, password: string) => {
  await initSanctum();

  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};
