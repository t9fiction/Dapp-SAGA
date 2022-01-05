export const loadWeb3 = (web3) => {
    return ({
        type: 'LOAD_WEB3',
        payload: web3
    })
}

export const loadContract = (contract) => {
    return ({
        type: 'LOAD_CONTRACT',
        payload: contract
    })
}

export const loadAccounts = (accounts) => {
    return ({
        type: 'LOAD_ACCOUNTS',
        payload: accounts
    })
}

export const loadState = (active) => {
    return({
        type: 'LOAD_STATE',
        payload: active
    })
}