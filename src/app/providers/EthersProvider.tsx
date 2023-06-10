import { AnyPublication, useExplorePublications } from "@lens-protocol/react-web";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { abi } from "../../abis/Ethylene.js";
import { ethers } from "ethers";
type EthersProvider = {
    assertToOracle: (contentOfThePost: string, postId: string) => Promise<void>
}
const EthersContext = createContext<EthersProvider>({} as EthersProvider);
export const EthProvider = ({ children }: {
    children: any
}) => {
    const contractAddress = "0x7807A8d0fD161b0AB28a29b7A0Ca7d8059A1F95B";
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);

    const assertToOracle = async (contentOfThePost: string, postId: string) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const trx = await contract.assertToOracle(stringToBytes(contentOfThePost), stringToBytes(postId));
        const receipt = await trx.wait();
        console.log(receipt);
    }

    function stringToBytes(input: string): Uint8Array {
        const encoder = new TextEncoder();
        return encoder.encode(input);
    }

    function bytesToString(bytes: Uint8Array): string {
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    return <EthersContext.Provider value={{
        assertToOracle
    }}>{children}</EthersContext.Provider>
}
export const useEthProvider = () => useContext(EthersContext);