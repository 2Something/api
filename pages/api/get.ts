import { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {f} = req.query;
    const blob = await put("blob.txt", "Hello, World!", { access: 'public' });
    res.status(200).send(blob);
}