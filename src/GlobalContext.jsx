import React, { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";

const AppContext = React.createContext();

const ContextProvider = ({children}) => {
    // const [data, setData] = useState([]);
    const{data
    }=useFetch()

    return <AppContext.Provider value={{data}}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, ContextProvider, useGlobalContext}
