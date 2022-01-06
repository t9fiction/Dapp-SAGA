import { createContext, useEffect, useContext, useState } from "react";
import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers'

const { ethereum } = window;

const getEtherContract = async () => {
    try {
        // if (window.ethereum !== undefined) {
        if (!ethereum) {
            return alert("Metamask not installed");
        } else {
            const provider = new ethers.providers.Web3Provider(ethereum);
            // await window.ethereum.enable()
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log({
                provider,
                contract,
                // accounts,
                signer
            })

        }
    } catch (error) {
        console.log("Wallet Not Connected", error)
    }
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(AppReducer, initialState);
    const [currentAccount, setCurrentAccount] = useState("initialState")
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''})

    const handleChange =(e, name) => {
        setFormData((prevState)=>({...prevState, [name]:e.target.value}))
    }

    //-----------------------------------------
    const checkWallet = async () => {
        try {
            if (!ethereum) return alert("Metamask not installed");

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            // await window.ethereum.enable()
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found")
            }
            console.log("Accounts", accounts)

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkWallet();
    }, []);

    //-----------------------------------------
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    //-----------------------------------------
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const { addressTo, amount, keyword, message } = formData;

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    return (
        <GlobalContext.Provider value={{ connectWallet, currentAccount, sendTransaction, formData, setFormData, handleChange }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);