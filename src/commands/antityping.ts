import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antityping = !ext.states.antityping
        sendConsoleMessage(`Você ${ext.states.antityping ? 'ativou' : 'desativou'} o Anti Typing (Digitando) com sucesso!`)
    },
    config: {
        name: 'antityping',
        description: "Ativa ou desativa o Anti Typing (digitando)"
    }
}