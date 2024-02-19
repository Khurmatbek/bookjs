import { createContext, useState } from "react";
export const BookContext = createContext();
export const BookProvider = ({ children }) => {
    const [bookinfo, setBookinfo] = useState([])
    return <BookContext.Provider value={{ bookinfo, setBookinfo }}>{children}</BookContext.Provider>
}