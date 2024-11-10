import axios from "axios"
import {NextResponse} from "next/server"
export const config = {runtime: 'edge'};

let token = "wsZeInkL7lSmoF53-gX4uyzER2sj7vhCRY7Acg.0u58JG.gNygzN2AzM3UTOxYzMxQTM4ITM"

export default async function discord() {
  const h = await axios.get("https://discord.com/api/v9/users/1152233237079400488", {
    "headers": {
      "Authorization": `Bot ${token.split('').reverse().join('')}`
    }
  })
  return NextResponse.json(h.data)
}