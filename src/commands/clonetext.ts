import { HDirection, HPacket } from "gnode-api";
import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        // Se o Clone Text estiver desativado
        if (!ext.states.clonetext) {
            // Marca o Clone Text como ativo
            ext.states.clonetext = true;
            sendConsoleMessage("Selecione o usuario que deseja copiar as mensagens")

            try {
                const userId = await getUserId(10000) // Função para obter o ID do usuário
                const user = getUserById(userId) // Função para obter o objeto do usuário pelo ID
                if (!user) return sendConsoleMessage('Não achei esse usuario na lista de usuarios do quarto, por favor reentre para consertar isso')
                
                ext.variables.cloningUserId = user.index // Salva o Index do usuário na variável
                sendConsoleMessage(`Clonando texto de ${user.name}`)
            } catch(error: any) {
                // Checa se o erro foi um timeout (tempo excedido)
                if (error instanceof Error && error.message.includes("Timeout")) {
                    sendConsoleMessage(
                        "Você não selecionou o usuario a tempo, execute o comando novamente"
                    );
                } else {
                    // Caso contrário, exibe o erro no console
                    sendConsoleMessage(`Ocorreu um erro inesperado, olhe o console.`);
                    console.error(error);
                }
            }

        } else if (ext.states.clonetext) { // Se o Clone Text estiver ativo
            // Marca o Clone Text como desativado
            ext.states.clonetext = false
            // Limpa o Index do usuário
            ext.variables.cloningUserId = 0
            sendConsoleMessage(`Desativando clonagem de texto`)
        }

    },
    config: {
        name: 'clonetext',
        description: "Imite todos os textos de um usuário"
    }
}