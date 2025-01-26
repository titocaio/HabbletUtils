import { HPacket } from "gnode-api";
import { ext } from "..";

export function sendConsoleMessage(message: string) {
    ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"${message}"}{i:0}{s:""}`))
}