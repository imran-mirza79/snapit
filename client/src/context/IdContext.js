import { createContext, useState } from 'react';

const IdContext =  createContext();

export const IdProvider = ({ children }) => {
    const [ currentId, setCurrentId ] = useState(null);

    return (
        <IdContext.Provider value={{currentId, setCurrentId}}>{children}</IdContext.Provider>
    )
    
}

export default IdContext;

