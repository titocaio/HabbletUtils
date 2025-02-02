import { Extension, HPacket } from "gnode-api"
import { sendNotification } from "../utils";

export let clickFloodInterval: NodeJS.Timer;

export const run = (ext: Extension, args: String[], from: String) => {
    if (!ext.state.clickFlood) {
        ext.state.clickFlood = true;
        ext.state.selectingUser = true;
        sendNotification(`Agora selecione o usuario para floodar.`, from)
    } else if (ext.state.clickFlood) {
        ext.state.clickFlood = false;
        ext.state.selectedUser = undefined;
        clearInterval(clickFloodInterval);
        sendNotification("Floodclick desabilitado.", from)
    }
};

export function setClickFloodInterval(interval: NodeJS.Timer) {
    clickFloodInterval = interval
}

export const config = {
    name: 'floodclick',
    description: 'Flooda de clicks o usuario selecionado (otimo para quartos que exibem a mensagem "Clicou em você")'
};
