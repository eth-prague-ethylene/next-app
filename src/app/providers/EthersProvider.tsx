import { AnyPublication, useExplorePublications } from "@lens-protocol/react-web";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { abi } from "../../abis/Ethylene.js";
import { ethers } from "ethers";
type EthersProvider = {
    assertToOracle: (contentOfThePost: string, postId: string) => Promise<void>,
    getAssertionData: (postId: string) => Promise<any>,
    getArrayData: () => Promise<any>
}
const EthersContext = createContext<EthersProvider>({} as EthersProvider);
export const EthProvider = ({ children }: {
    children: any
}) => {
    const contractAddress = "0xFBE786F2717106B5Fe17EE4F346907ab5d715a63";
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);

    const assertToOracle = async (contentOfThePost: string, postId: string) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(`Before posting: ${postId} with length: ${postId.length}`);
        const trx = await contract.assertToOracle(stringToBytes(contentOfThePost), stringToBytes(postId));
        await trx.wait();
    }

    const getAssertionData = async (postId: string) => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const data = await contract.getAssertionData(stringToHex(postId));
        console.log(data);
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
    }

    return <EthersContext.Provider value={{
        assertToOracle,
        getAssertionData,
        getArrayData
    }}>{children}</EthersContext.Provider>
}
export const useEthProvider = () => useContext(EthersContext);