import { createContext, useState } from "react";

const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
    const [ id, setId ] = useState(null);
    return (
        <DeleteContext.Provider value={{ id, setId }}>{children}</DeleteContext.Provider>
    )
}

export default DeleteContext;