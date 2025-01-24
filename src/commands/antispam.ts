import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        ext.states.antispam = !ext.states.antispam
        sendConsoleMessage(`Anti Spam ${ext.states.antispam ? 'Ativado' : 'Desativado'} `)
    },
    config: {
        name: 'antispam',
        description: "Bloqueia a mensagem de item recebido"
    }
}