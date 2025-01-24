import { HPacket } from "gnode-api";
import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        if (!ext.states.floodclick) {
            ext.states.floodclick = true
            
            try {
                sendConsoleMessage("Selecione o úsuario que você deseja floodar...")
                const userId = await getUserId(10000);
                const user = getUserById(userId);
                const int = setInterval(() => {
                    if (ext.states.floodclick) {
                        ext.sendToServer(new HPacket(`{out:GetSelectedBadges}{i:${userId}}`));
                    }
                    
                }, 50)
                ext.intervals.floodclick = int
                sendConsoleMessage(`Flood Click ativado com sucesso ${user ? `no úsuario ${user.name}` : ". mas eu percebi que as informações de usuarios no quarto não estão carregadas, por favor reentre no quarto!"} `)
            } catch (error) {
                // Check if the error is a timeout
                if (error instanceof Error && error.message.includes("Timeout")) {
                    sendConsoleMessage(
                        "Você não selecionou o usuario a tempo, execute o comando novamente"
                    );
                } else {
                    console.error(`Ocorreu um erro inesperado: ${error}`);
                }
            }
        } else if (ext.states.floodclick) {
            ext.states.floodclick = false
            ext.intervals.floodclick = null;
            sendConsoleMessage("Flood Click desativado")
        }
    },
    config: {
        name: 'floodclick',
        description: 'Flooda de clicks o usuario selecionado (otimo para quartos que exibem a mensagem "Clicou em você")'
    }
}