import { HPacket } from "gnode-api";
import { Ext } from "../classes/Extension"
import { sendConsoleMessage } from "../functions/sendConsoleMessage";
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: async (ext: Ext, args: String[]) => {
        // Se o Stay estiver desativado
        if (!ext.states.stay) { 
            // Marca o Stay como ativo
            ext.states.stay = true
            let myUser = ext.roomUsers.find((user) => user.id === ext.userObject.id) // Pega o objeto do nosso avatar
            if (!myUser) return sendConsoleMessage("Não consegui encontrar seu usuário no quarto, por favor reentre no quarto e tente novamente")

            ext.variables.stayPos = myUser.tile // Salva a posição do avatar

            const stayInterval = setInterval(() => {
                if (ext.states.stay) {
                    ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${ext.variables.stayPos.x}}{i:${ext.variables.stayPos.y}}`))
                }
            }, 38)

            ext.intervals.stay = stayInterval // Salva o intervalo no objeto de intervalos
            sendConsoleMessage(`Stay ativado na posição x: ${myUser.tile.x} y: ${myUser.tile.y}`)
        } else if (ext.states.stay) { // Se o Stay estiver ativo
            // Marca o Stay como desativado
            ext.states.stay = false
            // Limpa o intervalo
            if (ext.intervals.stay != null) clearInterval(ext.intervals.stay)
            ext.intervals.stay = null
            sendConsoleMessage(`Stay desativado`)
        }
    },
    config: {
        name: 'stay',
        description: "Ativa ou desativa o Stay (voltar para o lugar no qual você ativou o comando sempre que andar ou ser empurrado)"
    }
}