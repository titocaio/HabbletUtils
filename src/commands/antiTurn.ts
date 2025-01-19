import { Extension } from "gnode-api"
import { sendNotification } from "../utils"

export const run = (ext: Extension, args: String[], from: String) => {
    ext.state.antiTurn = !ext.state.antiTurn
    sendNotification(`${ext.state.antiTurn ? 'Enabled' : 'Disabled'} ${config.name}`, from)
}

export const config = {
    name: 'antiturn',
    description: "Ativa ou desativa o anti turn (giro)"
}