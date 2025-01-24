import { HDirection, HEntity, HEntityType, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { getUserId } from "../utils/emitUserId";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket()
        const idx = packet.readInteger()

        ext.roomUsers.filter((user) => user.index !== idx)
    },
    config: {
        name: 'Users Remove',
        header: 'UsersRemove',
        direction: HDirection.TOCLIENT  
    }
}