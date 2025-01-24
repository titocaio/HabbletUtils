import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antiafk = !ext.states.antiafk
        sendConsoleMessage(`Anti AFK ${ext.states.antiafk ? 'Ativado' : 'Desativado'}`)
    },
    config: {
        name: 'antiafk',
        description: "Ativa ou desativa o Anti AFK (inativo)"
    }
}