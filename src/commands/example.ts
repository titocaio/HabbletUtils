import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        try {
            sendConsoleMessage('Clique em um usuario...');
            const userId = await getUserId(10000); // Função para obter o ID do usuário
            sendConsoleMessage('ID Recebido: ' + userId);

            const user = getUserById(userId); // Função para obter o objeto do usuário pelo ID
            if (user) {
                sendConsoleMessage('Nome do usuário: ' + user.name);
            } else {
                sendConsoleMessage('Não achei esse usuario na lista de usuarios do quarto, por favor reentre no quarto para consertar isso')
            }
        } catch (error: any) {
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
    },
    config: {
        name: 'example',
        description: "Comando de exemplo, clique em um usuário ao utilizar para obter o id e possivelmente o HEntity"
    }
}