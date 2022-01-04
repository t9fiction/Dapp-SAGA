import React from 'react'
// import Web3 from 'web3'
import { ethers } from 'ethers'
import { loadWeb3, loadContract } from '../context/Actions';
import { contractABI, contractAddress } from './constants';

const { ethereum } = window;

export const ContractLoading = async (value) => {

    let provider = new ethers.providers.Web3Provider(ethereum);
    value(loadWeb3(provider));
    let signer = provider.getSigner();
    let contractVal = new ethers.Contract(contractAddress, contractABI, signer);
    value(loadContract(contractVal))

    console.log({
        provider,
        signer,
        contract
    })
    // try {
    // if (Web3.givenProvider) {
    //     let web3 = new Web3(Web3.givenProvider);
    //     await web3.givenProvider.enable();

    // let contract = new web3.eth.Contract(contractABI, contractAddress)

    // let accounts = new web3.eth.getAccounts();
    // dispatch(loadContract(accounts));

    // }
    // } catch (error) {
    // console.log("error", error)
    // return (
    //     <div>
    //         Nothing to load
    //     </div>
    // )
    // }

}
