import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
    console.log((await axios.get("http://localhost:3000/api/url")).data)
    res.send((await axios.get("http://localhost:3000")).data)
}