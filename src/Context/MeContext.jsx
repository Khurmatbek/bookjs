import { createContext, useState } from "react";
export const MeContext = createContext();
export const MeProvider = ({ children }) => {
    const [me, setMe] = useState((localStorage.getItem("me")) || {})
    return <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
}