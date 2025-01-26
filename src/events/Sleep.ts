import { HDirection, HMessage, HPacket } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { sendNotification } from "../functions/sendNotification";

export const event: Event = {
    run: async (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const index = packet.readInteger()
        const state = packet.readBoolean()

        if (!ext.states.antiafk || !state || index != ext.userObject.index) return;

        ext.sendToServer(new HPacket(`{out:AvatarExpression}{i:4}`))
    
        sendNotification(`Restored you from afk`)
    },
    config: {
        name: 'Sleep',
        header: 'Sleep',
        direction: HDirection.TOCLIENT
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}