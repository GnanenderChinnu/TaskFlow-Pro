import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tf_access");
    if (!token) {
      setLoading(false);
      return;
    }
    api.get("/auth/me/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("tf_access");
        localStorage.removeItem("tf_refresh");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login/", credentials);
    localStorage.setItem("tf_access", data.access);
    localStorage.setItem("tf_refresh", data.refresh);
    const me = await api.get("/auth/me/");
    setUser(me.data);
    toast.success("Welcome back");
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register/", payload);
    localStorage.setItem("tf_access", data.access);
    localStorage.setItem("tf_refresh", data.refresh);
    setUser(data.user);
    toast.success("Workspace created");
  };

  const logout = async () => {
    const refresh = localStorage.getItem("tf_refresh");
    try {
      await api.post("/auth/logout/", { refresh });
    } finally {
      localStorage.removeItem("tf_access");
      localStorage.removeItem("tf_refresh");
      setUser(null);
    }
  };

  const value = useMemo(() => ({ user, loading, login, register, logout, setUser }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
