import { HDirection, HMessage, HPacket } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { sendNotification } from "../functions/sendNotification";

export const event: Event = {
    run: async (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const reason = packet.readInteger()
    
        if (reason != 5 || !ext.states.antiafk) return;
    
        await delay(10)
        ext.sendToServer(new HPacket(`{out:AvatarExpression}{i:4}`))
    },
    config: {
        name: 'Anti AFK',
        header: 'AvatarExpression',
        direction: HDirection.TOSERVER 
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}