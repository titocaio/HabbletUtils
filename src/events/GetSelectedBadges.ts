import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { emitUserId } from "../utils/emitUserId";
import { getUserById } from "../functions/getUserById";
import { sendNotification } from "../functions/sendNotification";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const userId = packet.readInteger();

        emitUserId(userId)

        if (!ext.states.blockclick) return;

        hMessage.blocked = true

        const user = getUserById(userId)
        sendNotification(`Click bloqueado em ${user ? user.name : userId}`)
    },
    config: {
        name: 'Click User',
        header: 'GetSelectedBadges',
        direction: HDirection.TOSERVER 
    }
}