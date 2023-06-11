import { AnyPublication, useExplorePublications } from "@lens-protocol/react-web";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { abi } from "../../abis/Ethylene.js";
import { ethers } from "ethers";
type EthersProvider = {
    assertToOracle: (contentOfThePost: string, postId: string) => Promise<void>,
    getAssertionData: (postId: string, profileId: string) => Promise<any>,
    getArrayData: () => Promise<any>,
    settle: (postId: string) => Promise<any>,
    getAssertionResult: (postId: string) => Promise<any>
}
const EthersContext = createContext<EthersProvider>({} as EthersProvider);
export const EthProvider = ({ children }: {
    children: any
}) => {
    const contractAddress = "0xF342C5f80b1C3B4A9dE477a1AE20e4EDaE1A7f8c";
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);

    const settle = async (postId: string): Promise<any> => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const trx = await contract.settleAssertion(stringToHex(postId));
        const receipt = await trx.wait();
        console.log(receipt);
    }

    const assertToOracle = async (contentOfThePost: string, postId: string) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(`Before posting: ${postId} with length: ${postId.length}`);
        const trx = await contract.assertToOracle(stringToBytes(contentOfThePost), stringToBytes(postId));
        await trx.wait();
    }

    const getAssertionData = async (postId: string, profileId: string) => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const fullPostid = `${profileId}-${postId}`;
        const data = await contract.getAssertionData(stringToHex(fullPostid));
        console.log(stringToHex(fullPostid) );
        return data;
    }

    function stringToBytes(input: string): Uint8Array {
        const encoder = new TextEncoder();
        return encoder.encode(input);
    }

    function stringToHex(input: string) {
        const encoder = new TextEncoder();
        const uint8Array = encoder.encode(input);
        return `0x${bytesToHex(uint8Array)}`;
    }

    function bytesToHex(bytes: Uint8Array) {
        return Array.from(bytes)
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    function bytesToString(bytes: Uint8Array): string {
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    const getArrayData = async (): Promise<any> => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const data = await contract.getArrayData();
        console.log(data);
    }

    const getAssertionResult = async (postId: string) => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const data = await contract.getAssertionResult(stringToHex(postId));
        return data;
    }

    useEffect(() => {
        getArrayData();
    }, [])

    return <EthersContext.Provider value={{
        assertToOracle,
        settle,
        getAssertionData,
        getArrayData,
        getAssertionResult
    }}>{children}</EthersContext.Provider>
}
export const useEthProvider = () => useContext(EthersContext);