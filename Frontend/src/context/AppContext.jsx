import { createContext, useState, useEffect, useContext } from "react";
import { serverUrl } from "../main"; 
import axios from "axios";
import api from "../apiIntersepters";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();
  
  async function fetchUser() {
    setLoading(true);
    try {
      const { data } = await api.get("/api/auth/me");

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      const {data} = await api.post("/api/auth/logout");
      toast.success(data.message || "Logged out successfully");
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("something went wrong.");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, Loading, isAuth, setIsAuth, fetchUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppData = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppData must be used within an AppProvider");
  return context;
};
