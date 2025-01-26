import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antiturn = !ext.states.antiturn
        sendConsoleMessage(`Você ${ext.states.antiturn ? 'ativou' : 'desativou'} o Anti Turn (Giro) com sucesso!`)
    },
    config: {
        name: 'antiturn',
        description: "Ativa ou desativa o Anti Turn (Giro)"
    }
}