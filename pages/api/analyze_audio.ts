const ffmpeg = require("fluent-ffmpeg")
const path_probe = require("ffprobe-static").path
const path_peg = require("ffmpeg-static").path

console.log(path_probe)


import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (url && typeof(url) == "string") {

        try {
            // Get the duration of the MP3 file from the URL
            const duration = await getDurationFromUrl(url as string);
            res.status(200).json({ duration });
        } catch (error) {
            console.error("Error fetching duration:", error);
            res.status(500).json({ error: "Failed to fetch duration" });
        }
    }
}

function getDurationFromUrl(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
        ffmpeg.setFfmpegPath(path_peg)
        ffmpeg.setFfprobePath(path_probe)

        ffmpeg.ffprobe(url, (err, metadata) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(metadata.format.duration);
                }
            });
    });
}