import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.blockmove = !ext.states.blockmove
        sendConsoleMessage(`Você ${ext.states.blockmove ? 'ativou' : 'desativou'} o Bloqueio de movimento com sucesso!`)
    },
    config: {
        name: 'blockmove',
        description: "Ativa ou desativa a função de andar"
    }
}