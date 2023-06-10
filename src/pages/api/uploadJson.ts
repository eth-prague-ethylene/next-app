// req = HTTP incoming message, res = HTTP server response
import { v4 as uuidv4 } from 'uuid';

// Use the api keys by providing the strings directly 
import pinataSDK from '@pinata/sdk';
const pinata = new pinataSDK('43c382b0d8ecea2b465e', '401eb6aa63cadd7b4cdcf60809eaeb5b6b645dfbd3176ae075ebfac90d163e25');

export default async function handler(req: any, res: any) {
    const content = req.query.content;
    const handle = req.query.handle;
    
    if (content == null) {
        return res.status(400).json({ message: 'no content found in request' });
    }
    const body = {
        version: "2.0.0",
        metadata_id: uuidv4(),
        appId: "ethylene",
        mainContentFocus: 'TEXT_ONLY',
        content: content,
        description: "Description of the post",
        name: `Post by ${handle}`,
        locale: 'en-US',
        tags: ['lens-sdk'],
        attributes: []
    }
    console.log(body);
    const result = await pinata.pinJSONToIPFS(body);
    res.status(200).json({ text: 'Hello', result });
}