export const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_currency",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "_liveness",
                "type": "uint64"
            },
            {
                "internalType": "address",
                "name": "__oov3",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_claim",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_lensPostId",
                "type": "bytes"
            }
        ],
        "name": "assertToOracle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "defaultCurrency",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "defaultLiveness",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_lensPostId",
                "type": "bytes"
            }
        ],
        "name": "getAssertionData",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "arbitrateViaEscalationManager",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "discardOracle",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "validateDisputers",
                                "type": "bool"
                            },
                            {
                                "internalType": "address",
                                "name": "assertingCaller",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "escalationManager",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct OptimisticOracleV3Interface.EscalationManagerSettings",
                        "name": "escalationManagerSettings",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "asserter",
                        "type": "address"
                    },
                    {
                        "internalType": "uint64",
                        "name": "assertionTime",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bool",
                        "name": "settled",
                        "type": "bool"
                    },
                    {
                        "internalType": "contract IERC20",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint64",
                        "name": "expirationTime",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bool",
                        "name": "settlementResolution",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "domainId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "identifier",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bond",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "callbackRecipient",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "disputer",
                        "type": "address"
                    }
                ],
                "internalType": "struct OptimisticOracleV3Interface.Assertion",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_lensPostId",
                "type": "bytes"
            }
        ],
        "name": "getAssertionIdByLensPostId",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_lensPostId",
                "type": "bytes"
            }
        ],
        "name": "getAssertionResult",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_currency",
                "type": "address"
            }
        ],
        "name": "setDefaultCurrency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "_liveness",
                "type": "uint64"
            }
        ],
        "name": "setDefaultLiveness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_lensPostId",
                "type": "bytes"
            }
        ],
        "name": "settleAssertion",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]