import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.blockmove = !ext.states.blockmove
        sendConsoleMessage(`Bloqueio de movimento ${ext.states.blockmove ? 'Ativado' : 'Desativado'} `)
    },
    config: {
        name: 'blockmove',
        description: "Ativa ou desativa a função de andar"
    }
}