import { HDirection, HEntity, HEntityType, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { emitUserId } from "../utils/emitUserId";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const userId = packet.readInteger();

        emitUserId(userId)
    },
    config: {
        name: 'Click User',
        header: 'GetSelectedBadges',
        direction: HDirection.TOSERVER 
    }
}