import { HDirection, HMessage } from "gnode-api"
import { Ext } from "../classes/Extension";
import { Event } from "../interfaces/Event";

export const event: Event = {
    run: (ext: Ext, hMessage: HMessage) => {
        const packet = hMessage.getPacket();
        const chatId = packet.readInteger()
        const message = packet.readString()

        if (chatId != 999999999 || !message.startsWith("!")) return;

        const args = message.split(/\s+/g)
        const command = args[0].slice(1)
        const cmd = ext.commands.get(command)

        if (!cmd) {
            console.error(`Command '${command}' not found.`);
            return;
        }

        try {
            cmd.run(ext, args, "Console");
        } catch (error) {
            console.error(`Error running command '${command}':`, error);
        }
    },
    config: {
        name: 'Console',
        header: 'SendMsg',
        direction: HDirection.TOSERVER
    }
}