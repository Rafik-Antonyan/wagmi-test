import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useBalance, useContractRead, useFeeData, useToken } from 'wagmi'

export const Home = () => {
    const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "caretaker", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "CaretakerLoved", "type": "event" }, { "inputs": [], "name": "clean", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAlive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBoredom", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHunger", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getSleepiness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getStatus", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUncleanliness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "love", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "play", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sleep", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
    const { open } = useWeb3Modal()
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        formatUnits: 'gwei',
        watch: true
    })

    const { data: feeData } = useFeeData(
        {
            watch: true,
        }
    )
    const { data: tokenCoin } = useToken({
        address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        formatUnits: 'gwei',
        watch: true
    })
    const contractRead = useContractRead({
        address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        abi: abi,
        functionName: 'getHunger',
        // args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
    })
    console.log(tokenCoin);
    return <>
        <div>{isLoading && "Loading..."}</div>
        <div>{isError && "Error fetching balance"}</div>
        <div>{isConnecting && "Connecting"}</div>
        <div>{isDisconnected && "Disconnected"}</div>
        <div>{data && data.formatted}</div>
        <div>Address: {address}</div>
        <div>Fee data: {feeData?.formatted.gasPrice}</div>
        <button onClick={() => open()}>Connect</button>
    </>
}
