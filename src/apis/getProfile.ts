import { uploadJson } from '@/app/utils';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CreatePostTypedDataDocument, CreatePublicPostRequest } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/react-web';
import { TypedDataDomain, Wallet } from 'ethers';
// @ts-ignore
import omitDeep from 'omit-deep';
const APIURL = 'https://api-mumbai.lens.dev/';

export const apolloClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


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

export const createPostTypedData = async (request: CreatePublicPostRequest) => {
    const result = await apolloClient.mutate({
        mutation: CreatePostTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data!.createPostTypedData;
};


export const createPost = async (address: string, content: string) => {
    const handle = await getHandle(address);
    const profileId = (await getProfile(handle) as ProfileId);
    const ipfsHash = await uploadJson(content);
    const createPostRequest: CreatePublicPostRequest = {
        profileId,
        contentURI: ipfsHash,
        collectModule: {
            freeCollectModule: { followerOnly: true }
        }
    }
}