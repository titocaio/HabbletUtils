import { Ext } from "../classes/Extension"
import { Command } from "../interfaces/Command"

export const command: Command = {
    run: (ext: Ext, args: String[]) => {
        ext.commands.forEach((command) => {
            
        })
    },
    config: {
        name: 'help',
        description: "Lista todos os comandos disponiveis"
    }
}