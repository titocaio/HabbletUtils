import { HDirection, HMessage } from "gnode-api";
import { Ext } from "../classes/Extension";

export interface Event {
    run: (ext: Ext, hMessage: HMessage) => void; // Function executed by the command
    config: {
        name: string; //
        header: string | number;
        direction: HDirection
    };
}