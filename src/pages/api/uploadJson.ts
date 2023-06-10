// req = HTTP incoming message, res = HTTP server response

// Use the api keys by providing the strings directly 
import pinataSDK from '@pinata/sdk';
const pinata = new pinataSDK('43c382b0d8ecea2b465e', '401eb6aa63cadd7b4cdcf60809eaeb5b6b645dfbd3176ae075ebfac90d163e25');

export default async function handler(req: any, res: any) {
    const content = req.query.content;
    
    if (content == null) {
        return res.status(400).json({ message: 'no content found in request' });
    }
    const body = {
        message: content
    }
    const result = await pinata.pinJSONToIPFS(body);
    res.status(200).json({ text: 'Hello', result });
}