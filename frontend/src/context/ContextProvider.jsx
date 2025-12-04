import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data?.success) {
          setUser(res.data.user || null);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        // on network or server error, clear auth
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    };
    verifyUser();
  }, []);
  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
export default ContextProvider;
