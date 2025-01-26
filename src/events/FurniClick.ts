import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";
import { emitfurniId } from "../utils/emitFurniId";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const userId = packet.readInteger();

        emitfurniId(userId)
    },
    config: {
        name: 'Click Furni',
        header: 355,
        direction: HDirection.TOSERVER 
    }
}