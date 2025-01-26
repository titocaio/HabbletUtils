import { HPacket } from "gnode-api";
import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        // Se o Flood Click estiver desativado
        if (!ext.states.floodclick) {
            // Marca o Flood Click como ativo
            ext.states.floodclick = true

            try {
                sendConsoleMessage("Selecione o úsuario que você deseja floodar...")
                const userId = await getUserId(10000); // Função para obter o ID do usuário
                const user = getUserById(userId); // Função para obter o objeto do usuário pelo ID
                
                // Intervalo para enviar o pacote de clique no usuário
                const clickFloodInterval = setInterval(() => {
                    if (ext.states.floodclick) {
                        ext.sendToServer(new HPacket(`{out:GetSelectedBadges}{i:${userId}}`));
                    }
                    
                }, 50)

                //Salva o intervalo no objeto de intervalos
                ext.intervals.floodclick = clickFloodInterval
                sendConsoleMessage(`Flood Click ativado com sucesso ${user ? `no úsuario ${user.name}` : ". mas eu percebi que as informações de usuarios no quarto não estão carregadas, por favor reentre no quarto!"} `)
            } catch (error) {
                // Checa se o erro foi um timeout (tempo excedido)
                if (error instanceof Error && error.message.includes("Timeout")) {
                    sendConsoleMessage(
                        "Você não selecionou o usuario a tempo, execute o comando novamente"
                    );
                } else {
                    // Caso contrário, exibe o erro no console
                    sendConsoleMessage(`Ocorreu um erro inesperado, olhe o console.`)
                    console.error(`Ocorreu um erro inesperado: ${error}`);
                }
            }
        } else if (ext.states.floodclick) { // Se o Flood Click estiver ativo
            // Marca o Flood Click como desativado
            ext.states.floodclick = false
            // Limpa o intervalo
            if (ext.intervals.floodclick != null) clearInterval(ext.intervals.floodclick)
            ext.intervals.floodclick = null;
            sendConsoleMessage("Flood Click desativado")
        }
    },
    config: {
        name: 'floodclick',
        description: 'Flooda de clicks o usuario selecionado (otimo para quartos que exibem a mensagem "Clicou em você")'
    }
}