import { Extension, HDirection, HEntityUpdate, HMessage, HPacket } from "gnode-api"
import { stayPos } from "../commands/stay"

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket()
    const userUpdate = HEntityUpdate.parse(packet)

    for (const user of userUpdate) {
        if (user.index === ext.userObject.index && user.movingTo) {
            if (ext.state.stay) {
                ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${stayPos.x}}{i:${stayPos.y}}`))
            } else {
                const idx = ext.roomUsers.findIndex((usr) => usr.index === ext.userObject.index)
                ext.roomUsers[idx].tile = user.movingTo
            }
        }
    }

}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'UserUpdate',
}