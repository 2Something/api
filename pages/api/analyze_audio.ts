import {parseWebStream} from 'music-metadata'


import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (url && typeof(url) == "string") {

        (async () => {
        try {
            // Assuming you have a ReadableStream of an audio file
            const response = await fetch(url);
            const webStream = response.body;

            if (webStream) {

                // Parse the metadata from the web stream
                const metadata = await parseWebStream(webStream, 'audio/mpeg');

                // Log the parsed metadata
                res.send(metadata["format"]["duration"])
            }
        } catch (error) {
        console.error('Error parsing metadata:', error.message);
        }
        })();
        
    }
}