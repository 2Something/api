const ffmpeg = require("fluent-ffmpeg")

ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

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
        ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)
        ffmpeg
            .ffprobe(url, (err, metadata) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(metadata.format.duration);
                }
            });
    });
}