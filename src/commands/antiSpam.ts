import { Extension, HPacket } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[]) => {
    ext.state.antiSpam = !ext.state.antiSpam
    sendNotification(`${ext.state.antiSpam ? "Enabled" : "Disabled"} antispam`)
}

export const config = {
    name: 'antispam',
    description: "Comando para bloquear a mensagem de item recebido"
}