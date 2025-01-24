import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.commands.forEach((command) => {
            sendConsoleMessage(`!${command.config.name}: ${command.config.description}`)
            sendConsoleMessage('------------------------------------------------')
        })
    },
    config: {
        name: 'help',
        description: "Exibe todos os comandos disponíveis"
    }
}