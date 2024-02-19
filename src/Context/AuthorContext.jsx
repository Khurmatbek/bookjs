import { createContext, useState } from "react";
export const AuthorContext = createContext();
export const AuthorProvider = ({ children }) => {
    const [authorinfo, setAuthorinfo] = useState([])
    return <AuthorContext.Provider value={{ authorinfo, setAuthorinfo }}>{children}</AuthorContext.Provider>
}