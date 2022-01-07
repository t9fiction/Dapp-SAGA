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
            
            return contract;

        }
    } catch (error) {
        console.log("Wallet Not Connected", error)
    }
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(AppReducer, initialState);
    const [currentAccount, setCurrentAccount] = useState("initialState")
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [trxCount, setTrxCount] = useState(localStorage.getItem("trxCount"))

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
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
            const contract = getEtherContract();
            
            const parsedAmount = ethers.utils.parseEther(amount); //Build in ethereum function
            
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex
                }],
            });
            
            const trxHash = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            
            setIsLoading(true);
            console.log("value of setIsLoading : ",isLoading);
            console.log(`Loading - ${trxHash.hash}`);
            await trxHash.wait();
            setIsLoading(false);
            console.log(`Successfully loaded - ${trxHash.hash}`);
            
            const transactionCount = await contract.getTransactionCount();
            setTrxCount(transactionCount.toNumber());
            
        } catch (error) {
            console.log(error);
            
            throw new Error("No ethereum object1");
        }
    };
    
    useEffect(() => {
        checkWallet();
    }, []);
    
    return (
        <GlobalContext.Provider value={{ connectWallet, currentAccount, sendTransaction, formData, isLoading, handleChange }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);