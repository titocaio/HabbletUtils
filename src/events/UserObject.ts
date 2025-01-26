import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const [id, name, fullId, genre, motto ] = packet.read('iSSSSS')
        
        ext.userObject = {
            id,
            name,
            fullId,
            genre,
            motto
        }
    },
    config: {
        name: 'UserObject',
        header: 'UserObject',
        direction: HDirection.TOCLIENT  
    }
}