import axios from "axios"

export function formatPicture(picture: any) {
  if (picture.__typename === 'MediaSet') {
    if (picture.original.url.startsWith('ipfs://')) {
      let result = picture.original.url.substring(7, picture.original.url.length)
      return `http://lens.infura-ipfs.io/ipfs/${result}`
    } else if (picture.original.url.startsWith('ar://')) {
      let result = picture.original.url.substring(4, picture.original.url.length)
      return `http://arweave.net/${result}`
    } else {
      return picture.original.url
    }
  } else {
    return picture
  }
}

export const uploadJson = async (postContent: unknown, handle: string): Promise<string> => {
  const gateWayPinataUrl = 'https://gateway.pinata.cloud/ipfs/'
  if (postContent != null) {
    const result = await axios.get(`/api/uploadJson?content=${postContent}&handle=${handle}`);
    const hash = result.data.result.IpfsHash;
    const fullUrl = `${gateWayPinataUrl}${hash}`;
    return fullUrl;
  } else {
    throw new Error("Post content not found");
  }

}