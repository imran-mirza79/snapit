import { createContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [ loadingState, setLoadingState ] = useState({isLoading:false, message:null});
    return <LoadingContext.Provider value={{loadingState, setLoadingState} }>{children}</LoadingContext.Provider>
}

export default LoadingContext;