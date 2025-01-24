import { HDirection, HEntity, HEntityType, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket()
        const userParser = HEntity.parse(packet)
    
        if (userParser.length >= 5) return ext.roomUsers = userParser
    
        for (const user of userParser) {
            if (user.entityType === HEntityType.HABBO) ext.roomUsers.push(user);
        }
    },
    config: {
        name: 'Users',
        header: 'Users',
        direction: HDirection.TOCLIENT  
    }
}