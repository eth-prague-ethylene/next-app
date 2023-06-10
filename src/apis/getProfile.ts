import { uploadJson } from '@/app/utils';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CreatePostTypedDataDocument, CreatePublicPostRequest } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/react-web';
import { TypedDataDomain, Wallet, utils } from 'ethers';
import { ethers } from 'ethers';
// @ts-ignore
import omitDeep from 'omit-deep';
const APIURL = 'https://api-mumbai.lens.dev/';
import ABI from '../../abi.json'

export const prettyJSON = (message: string, obj: string) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

export const signedTypeData = async (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>,
  signer: any
) => {
  // remove the __typedname from the signature!
  const result = await signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  );


  return result;
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

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
                  },                                    
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
    const signedResult = result
    console.log(signedResult)
    const { data } = signedResult
    const { createPostTypedData } = data
    const { typedData } = createPostTypedData
    const sig2 = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);

    console.log('sig2: ', sig2)
  
    const { v, r, s } = splitSignature(sig2);



    const lensHub = new ethers.Contract("0x60Ae865ee4C725cd04353b5AAb364553f56ceF82", ABI, signer);

    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
  
    console.log(tx);
    return result;
  }
}

// export const signCreatePostTypedData = async (request: CreatePublicPostRequest) => {
//   const result = await createPostTypedData(request);
//   console.log('create post: createPostTypedData', result);

//   const typedData = result.typedData;
//   console.log('create post: typedData', typedData);

//   const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
//   console.log('create post: signature', signature);

//   return { result, signature };
// };

// export const getError = async () => {
//   const result = await apolloClient.query({
//     query: gql(`
//     query PublicationMetadataStatus {
//       publicationMetadataStatus(request: { txId: "9b74adbd-231d-4b55-afc6-491aa733a24c" }) {
//         status
//         reason
//       }
//     }
//     `)
//   })
//   console.log(result);
// }

export const getSpecificPublication = async () => {
  const result = await apolloClient.query({
    query: gql(`
    query Publication {
      publication(request: {
        publicationId: "9b74adbd-231d-4b55-afc6-491aa733a24c"
      }) {
       __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
    }
    
    fragment MediaFields on Media {
      url
      mimeType
    }
    
    fragment ProfileFields on Profile {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      isFollowedByMe
      isFollowing(who: null)
      followNftAddress
      metadata
      isDefault
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            ...MediaFields
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            ...MediaFields
          }
        }
      }
      ownedBy
      dispatcher {
        address
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ...FollowModuleFields
      }
    }
    
    fragment PublicationStatsFields on PublicationStats { 
      totalAmountOfMirrors
      totalAmountOfCollects
      totalAmountOfComments
      totalUpvotes
    }
    
    fragment MetadataOutputFields on MetadataOutput {
      name
      description
      content
      media {
        original {
          ...MediaFields
        }
      }
      attributes {
        displayType
        traitType
        value
      }
    }
    
    fragment Erc20Fields on Erc20 {
      name
      symbol
      decimals
      address
    }
    
    fragment PostFields on Post {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ...ReferenceModuleFields
      }
      appId
      hidden
      reaction(request: null)
      mirrors(by: null)
      hasCollectedByMe
    }
    
    fragment MirrorBaseFields on Mirror {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ...ReferenceModuleFields
      }
      appId
      hidden
      reaction(request: null)
      hasCollectedByMe
    }
    
    fragment MirrorFields on Mirror {
      ...MirrorBaseFields
      mirrorOf {
       ... on Post {
          ...PostFields          
       }
       ... on Comment {
          ...CommentFields          
       }
      }
    }
    
    fragment CommentBaseFields on Comment {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ...ReferenceModuleFields
      }
      appId
      hidden
      reaction(request: null)
      mirrors(by: null)
      hasCollectedByMe
    }
    
    fragment CommentFields on Comment {
      ...CommentBaseFields
      mainPost {
        ... on Post {
          ...PostFields
        }
        ... on Mirror {
          ...MirrorBaseFields
          mirrorOf {
            ... on Post {
               ...PostFields          
            }
            ... on Comment {
               ...CommentMirrorOfFields        
            }
          }
        }
      }
    }
    
    fragment CommentMirrorOfFields on Comment {
      ...CommentBaseFields
      mainPost {
        ... on Post {
          ...PostFields
        }
        ... on Mirror {
           ...MirrorBaseFields
        }
      }
    }
    
    fragment FollowModuleFields on FollowModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
        contractAddress
      }
      ... on RevertFollowModuleSettings {
        type
        contractAddress
      }
      ... on UnknownFollowModuleSettings {
        type
        contractAddress
        followModuleReturnData
      }
    }
    
    fragment CollectModuleFields on CollectModule {
      __typename
      ... on FreeCollectModuleSettings {
        type
        followerOnly
        contractAddress
      }
      ... on FeeCollectModuleSettings {
        type
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
      }
      ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
        endTimestamp
      }
      ... on RevertCollectModuleSettings {
        type
      }
      ... on TimedFeeCollectModuleSettings {
        type
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
        endTimestamp
      }
      ... on UnknownCollectModuleSettings {
        type
        contractAddress
        collectModuleReturnData
      }
    }
    
    fragment ReferenceModuleFields on ReferenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
        contractAddress
      }
      ... on UnknownReferenceModuleSettings {
        type
        contractAddress
        referenceModuleReturnData
      }
      ... on DegreesOfSeparationReferenceModuleSettings {
        type
        contractAddress
        commentsRestricted
        mirrorsRestricted
        degreesOfSeparation
      }
    }
    
    `)
  })
  console.log(result);
}