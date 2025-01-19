import { Extension, HPacket, HPoint } from "gnode-api"
import { sendNotification } from "../utils/habbo/notify";

export let stayPos = new HPoint(0, 0)
export let stayInterval: NodeJS.Timer;

export const run = (ext: Extension, args: String[], from: String) => {
    if (!ext.state.stay) {
        ext.state.stay = true
        let myUser = ext.roomUsers.find((user) => user.id === ext.userObject.id)
        if (myUser) stayPos = myUser.tile
        stayInterval = setInterval(() => {
            if (ext.state.stay) {
                ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${stayPos.x}}{i:${stayPos.y}}`))
            }
        }, 50)

        sendNotification(`Enabled stay at x: ${stayPos.x} y: ${stayPos.y}`, from)
    } else {
        clearInterval(stayInterval)
        ext.state.stay = false
        sendNotification(`Disabled stay`, from)
    }
}

export const config = {
    name: 'stay',
    description: "Ativa ou desativa o stay (ao sair do lugar salvo volte automaticamente)"
}