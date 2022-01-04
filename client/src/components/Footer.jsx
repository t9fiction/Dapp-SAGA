import React from 'react'
import { GlobalStore } from '../context/GlobalState';
import { ContractLoading } from '../utils/ContractLoading';

const Footer = () => {
    
    const [{ web3, contract, balance, accounts }, dispatch] = GlobalStore();

    const handleSubmit = () => {
        ContractLoading();
    }

    console.log("contract : ", contract)
    console.log("Balance : ", balance)
    console.log("Web3 : ", web3)
    console.log("accounts : ", accounts)

    return (
        <div>
            <button onClick={handleSubmit()}>Submit b</button>
        </div>
    )
}

export default Footer;