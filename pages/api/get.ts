import { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.json({
        "Message": "OK",
        "body": "Hello World"
    })
}