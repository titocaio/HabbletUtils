import { HPacket } from "gnode-api";
import { Ext } from "../classes/Extension"
import { getUserById } from "../functions/getUserById";
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"
import { getfurniId } from "../utils/emitFurniId";
import { getUserId } from "../utils/emitUserId";

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        // Se o Flood Handitem estiver desativado
        if (!ext.states.floodhanditem) {
            // Marca o Flood Handitem como ativo
            ext.states.floodhanditem = true

            try {
                sendConsoleMessage('Clique no mobi que dê o item...');
                const furniId = await getfurniId(10000); // Função para obter o ID do mobi
                sendConsoleMessage('FurniId Recebido: ' + furniId);
                sendConsoleMessage('Clique em um usuario...');
                const userId = await getUserId(10000); // Função para obter o ID do usuário
                sendConsoleMessage('UserId Recebido: ' + userId);
    
                const floodHandItemInterval = setInterval(() => {
                    ext.sendToServer(new HPacket(`{h:355}{i:${furniId}}`))
                    ext.sendToServer(new HPacket(`{out:PassCarryItem}{i:${userId}}`));
                }, 50)
                ext.intervals.floodhanditem = floodHandItemInterval
                
                const user = getUserById(userId);
                sendConsoleMessage(`Flood Handitem ativado com sucesso no ${user ? user.name : userId}`)
            } catch (error: any) {
                if (error instanceof Error && error.message.includes("Timeout")) {
                    sendConsoleMessage(
                        `Você não selecionou o usuario o ${error.message.includes("User") ? "mobi" : "usuario"} a tempo, execute o comando novamente`
                    );
                } else {
                    sendConsoleMessage(`Ocorreu um erro inesperado, olhe o console.`);
                    console.error(error);
                }
            }
        } else if (ext.states.floodhanditem) {
            ext.states.floodhanditem = false
            if (ext.intervals.floodhanditem != null) clearInterval(ext.intervals.floodhanditem)
            ext.intervals.floodhanditem = null;
            sendConsoleMessage("Flood Handitem desativado") 
        }
    },
    config: {
        name: 'floodhanditem',
        description: "Comando de exemplo, clique em um usuário ao utilizar para obter o id e possivelmente o HEntity"
    }
}