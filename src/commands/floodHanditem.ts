import { Extension, HPacket } from "gnode-api"
import { sendNotification } from "../utils";

export let handitemFloodInterval: NodeJS.Timer;

export const run = (ext: Extension, args: String[], from: String) => {
    if (!ext.state.handItemFlood) {
        ext.state.handItemFlood = true;
        ext.state.selectingHandItemFurni = true
        sendNotification(`Now select the furni that give you the handitem`, from)
    } else if (ext.state.handItemFlood) {
        ext.state.handItemFlood = false;
        ext.state.selectedUser = undefined;
        clearInterval(handitemFloodInterval);
        sendNotification("Disabled handitem flood", from)
    }
};

export function setHanditemFloodInterval(interval: NodeJS.Timer) {
    handitemFloodInterval = interval
}

export const config = {
    name: 'floodhanditem',
    description: 'Flooda de handitem o usuario selecionado (otimo para quartos que tem um furni com o wired "Dar item ao usuario")'
};