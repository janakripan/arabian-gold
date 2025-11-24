import React ,{ createContext, useContext } from "react";


const RefetchContext = createContext()

export const RefetchProvider = ({children , refetchers}) => {
    const refetchAll = async() =>{
        await Promise.all(refetchers.map((fn) => fn?.()))
    }

    return(
        <RefetchContext.Provider value={{refetchAll}} >
            {children}
        </RefetchContext.Provider>
    )
}

export const useRefetchContext = () =>useContext(RefetchContext)