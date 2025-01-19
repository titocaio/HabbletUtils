import { Extension, HDirection, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
    if (!ext.state.blockMove) return;
    hMessage.blocked = true
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 'MoveAvatar',
}