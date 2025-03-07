import { NextApiRequest, NextApiResponse } from "next";
import {PassThrough, Readable, Writable} from 'stream'
import * as dfpwm from 'dfpwm'
import axios from "axios";
const ffmpeg = require("fluent-ffmpeg")

async function downloadPCM(url: string) {
  return Buffer.from((await axios({
    method: "get",
    url: url,
    responseType: "arraybuffer"
  })).data)
    
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {url} = req.query
  if (url && typeof(url) == "string") {
    
    const chunks: Buffer = await downloadPCM(url)
    const outputStream = new PassThrough();

    const pcmChunks: any = [];
    console.log(require("@ffmpeg-installer/ffmpeg").path)

    ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)

    console.log(chunks)

    const fp = ffmpeg(Readable.from(chunks))
      //.inputFormat("mp3")
      .setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)
      .audioCodec("pcm_s8")
      .format("s8")
      .outputOptions("-ar", "48000")
      .outputOptions("-f", "s8")
      .audioChannels(1)
      .pipe(outputStream)

    outputStream.on("data", chunk => pcmChunks.push(chunk))
    outputStream.on("error", error => console.log("FFmpeg error: " + error))
    outputStream.on("end", () => {res.send(new dfpwm.Encoder().encode(Buffer.concat(pcmChunks)))})
  }
}