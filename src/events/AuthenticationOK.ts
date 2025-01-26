import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        ext.states.login = true;
    },
    config: {
        name: 'Login',
        header: 'AuthenticationOK',
        direction: HDirection.TOCLIENT  
    }
}