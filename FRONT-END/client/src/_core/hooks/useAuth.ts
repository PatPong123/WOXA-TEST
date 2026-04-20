import { useCallback, useEffect, useMemo, useState } from "react";
import { getLoginUrl } from "@/const";

type User = {
  id: number;
  username: string;
};

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } =
    options ?? {};

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 🔄 โหลด user จาก backend
  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = redirectPath;
  }, [redirectPath]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // 🔁 redirect ถ้าไม่ได้ login
  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (loading) return;
    if (user) return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, loading, user, redirectPath]);

  return useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      refresh: fetchMe,
      logout,
    }),
    [user, loading, error, fetchMe, logout]
  );
}
