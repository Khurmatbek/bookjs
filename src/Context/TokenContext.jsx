import { createContext, useState } from "react";
export const TokenContext = createContext();
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || "")
    return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>
}