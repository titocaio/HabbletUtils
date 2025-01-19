import { Extension } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[], from: String) => {
    ext.state.antiAfk = !ext.state.antiAfk
    sendNotification(`${ext.state.antiAfk ? 'Enabled' : 'Disabled'} ${config.name}`, from)
}

export const config = {
    name: 'antiafk',
    description: "Ativa ou desativa o anti afk (inativo)"
}