import { Extension, HDirection, HMessage, HPacket } from "gnode-api"
import { sendNotification } from "../utils";

export const run = async (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket();
    const reason = packet.readInteger()

    if (reason != 5 || !ext.state.antiAfk) return;

    await delay(10)
    ext.sendToServer(new HPacket(`{out:AvatarExpression}{i:4}`))

    sendNotification(`Restored you from afk`)
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 'AvatarExpression',
}