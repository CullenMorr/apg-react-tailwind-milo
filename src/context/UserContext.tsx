// context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  scope: string[];
};

type UserContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the dev user (or real user later)
    fetch("/api/dev-user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to load user", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
