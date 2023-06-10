import { uploadJson } from '@/app/utils';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CreatePostTypedDataDocument, CreatePublicPostRequest } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/react-web';
import { TypedDataDomain, Wallet } from 'ethers';
import { ethers } from 'ethers';
// @ts-ignore
import omitDeep from 'omit-deep';
const APIURL = 'https://api-mumbai.lens.dev/';

export const apolloClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache()
})

export const getChallenge = async (address: string) => {
    const response = await apolloClient.query({
        query: gql(`
        query Challenge {
            challenge(request: { address: "${address}" }) {
              text
            }
          }
        `)
    })
    return response.data.challenge.text;
}



export const getHandle = async (address: string): Promise<string> => {
    const response = await apolloClient.query({
        query: gql(
            `query Profiles {
                profiles(request: { ownedBy: "${address}"}) {
                  items {
                    handle
                  }
                }
            }`
        )
    })
    return response.data.profiles.items[0].handle;
}

export const getProfile = async (handle: string): Promise<string> => {
    const response = await apolloClient.query({
        query: gql(`
            query Profile {
                profile(request: { handle: "${handle}"}) {
                  id
                }
            }`
        )
    })
    return response.data.profile.id;
}

export const authenticate = async (address: string, signature: string) => {
    const response = await apolloClient.mutate({
        mutation: gql(`
        mutation Authenticate {
            authenticate(request: {
              address: "${address}",
              signature: "${signature}"
            }) {
              accessToken
              refreshToken
            }
          }
        `)
    });
    return response.data.authenticate.accessToken;
}


export const createPost = async (profileId: string, contentURI: string, address: string) => {
    const challenge = await getChallenge(address);
    // i need to sign the challenge
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(challenge);
        const jsonToken = await authenticate(address, signature);
        const newClient = new ApolloClient({
            uri: APIURL,
            cache: new InMemoryCache(),
            headers: {
                'x-access-token': jsonToken
            }
        })
        const result = await newClient.mutate({
            mutation: gql(`
            mutation CreatePostTypedData {
                createPostTypedData(request: {
                  profileId: "${profileId}",
                  contentURI: "${contentURI}",
                  collectModule: {
                    revertCollectModule: true
                  },
                  referenceModule: {
                    followerOnlyReferenceModule: false
                  }
                }) {
                  id
                  expiresAt
                  typedData {
                    types {
                      PostWithSig {
                        name
                        type
                      }
                    }
                    domain {
                      name
                      chainId
                      version
                      verifyingContract
                    }
                    value {
                      nonce
                      deadline
                      profileId
                      contentURI
                      collectModule
                      collectModuleInitData
                      referenceModule
                      referenceModuleInitData
                    }
                  }
                }
              }
            `)
        })
        console.log(result);
    }
}