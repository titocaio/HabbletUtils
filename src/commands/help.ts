import { Extension, HPacket } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[]) => {
    ext.commands.forEach((command) => {
        sendNotification(`!${command.config.name}: ${command.config.description}`, "console")
        ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"------------------------------------------------"}{i:0}{s:""}`))
    })
}

export const config = {
    name: 'help',
    description: "Lista todos os comandos disponiveis"
}