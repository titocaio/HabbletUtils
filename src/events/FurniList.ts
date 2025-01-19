import { Extension, HDirection, HInventoryItem, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket();
    const items = HInventoryItem.parse(packet)
}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'FurniList',
}