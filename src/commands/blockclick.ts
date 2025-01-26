import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.blockclick = !ext.states.blockclick
        sendConsoleMessage(`Você ${ext.states.blockclick ? 'ativou' : 'desativou'} Bloqueio do click em usuarios com sucesso!`)
    },
    config: {
        name: 'blockclick',
        description: "Ativa ou desativa a função de bloquear o click em usuários (bloqueia o wired de click em habblet)"
    }
}