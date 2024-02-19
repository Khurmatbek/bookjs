import { createContext, useState } from "react";
export const DarkContext = createContext();
export const DarkProvider = ({ children }) => {
    const [DarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("dark"))||false)
    return <DarkContext.Provider value={{ DarkMode, setDarkMode }}>{children}</DarkContext.Provider>
}