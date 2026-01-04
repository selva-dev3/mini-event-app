import { createContext, useState,useEffect } from "react";

export const tokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const url = 'http://localhost:4000'
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  return (
    <tokenContext.Provider value={{ token, setToken,url }}>
      {children}
    </tokenContext.Provider>
  );


}