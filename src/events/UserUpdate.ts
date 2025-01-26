import { HDirection, HEntity, HEntityType, HEntityUpdate, HMessage, HPacket } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket()
        const userUpdateParser = HEntityUpdate.parse(packet)
    
        for (const user of userUpdateParser) {
            if (user.index === ext.userObject.index && user.movingTo) {
                if (ext.states.stay) {
                    ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${ext.variables.stayPos.x}}{i:${ext.variables.stayPos.y}}`))
                } else {
                    const idx = ext.roomUsers.findIndex((usr) => usr.index === ext.userObject.index)
                    ext.roomUsers[idx].tile = user.movingTo
                }
            }
        }
    },
    config: {
        name: 'UserUpdate',
        header: 'UserUpdate',
        direction: HDirection.TOCLIENT  
    }
}