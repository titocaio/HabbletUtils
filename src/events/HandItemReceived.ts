import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        if (ext.states.antispam) hMessage.blocked = true
    },
    config: {
        name: 'HandItemReceived',
        header: 'HandItemReceived',
        direction: HDirection.TOCLIENT
    }
}