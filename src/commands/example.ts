import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        try {
            sendConsoleMessage('Clique em um usuario...');
            const userId = await getUserId(10000);
            sendConsoleMessage('ID Recebido: ' + userId);

            const user = getUserById(userId);
            if (user) {
                sendConsoleMessage('Nome do usuário: ' + user.name);
            } else {
                sendConsoleMessage('Não achei esse usuario na lista de usuarios do quarto, por favor reentre para consertar isso')
            }
        } catch (error: any) {
            sendConsoleMessage('Error, olhe o console');
            console.error('Error:', error.message);
        }
    },
    config: {
        name: 'example',
        description: "Comando de exemplo, clique em um usuário ao utilizar para obter o id e possivelmente o HEntity"
    }
}