import { HDirection, HMessage, HPacket } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { sendNotification } from "../functions/sendNotification";

export const event: Event = {
    run: async (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const index = packet.readInteger()
        const text = packet.readString()

        if (!ext.states.clonetext || ext.states.cloningUserId === 0) return;
        if (index !== ext.states.cloningUserId) return;

        await delay(10)
        const msgpacket = new HPacket('Chat', HDirection.TOSERVER)
        .appendString(text)
        .appendInt(1007)
        .appendInt(0)
        ext.sendToServer(msgpacket)

    },
    config: {
        name: 'Chat',
        header: 'Chat',
        direction: HDirection.TOCLIENT
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}