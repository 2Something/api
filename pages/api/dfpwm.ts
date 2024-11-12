import { NextApiRequest, NextApiResponse } from "next";
import {PassThrough, Readable, Writable} from 'stream'
import * as dfpwm from 'dfpwm'
import axios from "axios";
const ffmpeg = require("fluent-ffmpeg")
import { FfmpegCommand } from "fluent-ffmpeg";

/*let cache = (Math.random() + 1).toString(36).substring(2);const I = path.join("/tmp",`temp-${cache}.mp3`);const O = path.join("/tmp",`temp-${cache}.dfpwm`);const audioWriteStream = fs.createWriteStream(I);var audio = await ytdl(url2, { quality: "highestaudio" });
      audio.pipe(audioWriteStream);

      audio.on("finish", async () => {
        exec(`${require("ffmpeg-static")} -i ${I} -ac 1 -c:a dfpwm ${O} -ar 48k`).on("close", (code) => {console.log(`Process FFmpeg exited with code ${code}`);
        if (code == 0) {
          fs.readFile(O, "utf8", (err, data) => {
            if (err) {res.status(200).json(generateTrace(-1, "101_IO_READ_ERROR",{})); return}
            fs.createReadStream(O).pipe(res);
          })
        }else{res.status(200).json(generateTrace(-1, "101_FFMPEG_FAILURE",{}))}
        fs.unlink(I, (err) => {if (err) {res.status(200).json(generateTrace(-2,"404_IO_DELETE_ERROR",{"MAINTENANCE REQUIRED": "PLEASE CONTACT IF YOU RECEIVE THIS ERROR @github.com/bakedc"}))}})
        //fs.unlink(O, (err) => {if (err) {res.status(200).json(generateTrace(-2,"404_IO_DELETE_ERROR",{"MAINTENANCE REQUIRED": "PLEASE CONTACT IF YOU RECEIVE THIS ERROR @github.com/bakedc"}))}}) 
      })})*/

function generateTrace(code, trace, content) {return {"Code": code, "Exception": trace, "DATA": content}}

async function downloadPCM(url: string) {
  

  // Step 1: Download YouTube audio stream
  /*console.log("Downloading audio...");
  const audioStream = ytdl(url, { filter: 'audioonly'});
  const chunks: any = [];
  audioStream.on("data", chunk => chunks.push(chunk))

  return new Promise<Buffer>(resolve => audioStream.on("end", () => {resolve(Buffer.concat(chunks))}))*/
  return Buffer.from((await axios({
    method: "get",
    url: url,
    responseType: "arraybuffer"
  })).data)
  
  
  

  
  // Step 2: Decode MP3 to PCM using prism-media
    
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
      .inputFormat("mp3")
      .setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path)
      .audioCodec("pcm_s8")
      .format("s8")
      .outputOptions("-ar", "48000")
      .audioChannels(1)
      .pipe(outputStream)

    outputStream.on("data", chunk => pcmChunks.push(chunk))
    outputStream.on("end", () => {res.send(new dfpwm.Encoder().encode(Buffer.concat(pcmChunks)))})
  }
}