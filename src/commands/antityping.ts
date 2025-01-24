import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antityping = !ext.states.antityping
        sendConsoleMessage(`Anti Turn ${ext.states.antityping ? 'Ativado' : 'Desativado'}`)
    },
    config: {
        name: 'antityping',
        description: "Ativa ou desativa o Anti Typing (digitando)"
    }
}