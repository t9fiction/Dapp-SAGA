import { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    web3: null,
    balance: 0,
    contract: null,
    accounts: 0,
    // handleChange: null,
    active: false
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);