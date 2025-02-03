import { Extension } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[], from: String) => {
    ext.state.ping = !ext.state.ping
    sendNotification(`${ext.state.ping ? 'Habilitado' : 'Desabilitado'} ${config.name}`, from)
}

export const config = {
    name: 'ping',
    description: "Ativa ou desativa o ping pong sc"
}
