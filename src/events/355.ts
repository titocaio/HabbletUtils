
import { Extension, HDirection, HInventoryItem, HMessage } from "gnode-api"
import { sendNotification } from "../utils";

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket();
    const id = packet.readInteger();

    if (ext.state.selectingHandItemFurni) {
        ext.state.selectingHandItemFurni = false
        ext.state.handItemFurni = id
        ext.state.selectingUser = true

        sendNotification(`Furni ${id} selecionado, agora selecione o usuario`)
    }
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 355,
}