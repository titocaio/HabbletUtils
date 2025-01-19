import { Extension, HDirection, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket();
    const message = packet.readString();

    if (!message.startsWith("!")) return;

    const args = message.split(/\s+/g)
    const command = args[0].slice(1)
    const cmd = ext.commands.get(command)

    if (!cmd) return;

    cmd.run(ext, args, "chat")
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 'Chat',
}