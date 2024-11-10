import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server"
//export const config = {runtime: 'edge'};
const content = `hello`
import dowYoutubeVideo from "./dfpwm"

export default async function testff(req: NextApiRequest, res: NextApiResponse) {
    const youtubeUrl = "7QcgvFRVszU"
    const video = await axios.get("http://localhost:3000/api/dfpwm?url=" + youtubeUrl)
    
    res.json(video.data)
}