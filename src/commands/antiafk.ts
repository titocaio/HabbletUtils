import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antiafk = !ext.states.antiafk
        sendConsoleMessage(`Você ${ext.states.antiafk ? 'ativou' : 'desativou'} o Anti AFK com sucesso!`)
    },
    config: {
        name: 'antiafk',
        description: "Ativa ou desativa o Anti AFK (inativo)"
    }
}