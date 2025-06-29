import { HDirection, HPacket } from "gnode-api";
import { Ext } from "./Extension";

export class Console {
    ext: Ext;
    name: string;
    figureString: string;
    motto: string;

    constructor(ext: Ext) {
        this.ext = ext;

        this.name = "Habblet Utils"
        this.figureString = "M=hd-205-97554.lg-275-92.hr-11743-49.ch-215-92.sh-3621-92-1408.fa-1202-73.wa-11831-73.ha-11225-92-73"
        this.motto = "By @RiotSpacebar"
        
        this.createConsole();
    }

    createConsole() {
        // Create the Bot User
        const botUserPacket = new HPacket('FriendListUpdate', HDirection.TOCLIENT)
        .appendInt(0)
        .appendInt(1)
        .appendInt(0)
        .appendInt(999999999)
        .appendString(this.name)
        .appendInt(1)
        .appendBoolean(true)
        .appendBoolean(true)
        .appendString(this.figureString)
        .appendInt(0)
        .appendString(this.motto)
        .appendInt(0)
        .appendInt(0)
        .appendBoolean(false)

        // Send the botUserPacket to put the bot online on your friend list
        this.ext.sendToClient(botUserPacket)

        this.sendConsoleMessage(`[Habblet Utils] Loaded`)

        if (!this.ext.states.login) {
            this.sendConsoleMessage(`[Habblet Utils] Você iniciou a extensão enquanto já estava logado, caso você esteja em um quarto por favor reentre no quarto.`)
            this.sendConsoleMessage(`------------------------------------------------`)
        }
    }

    sendConsoleMessage(message: string) {
        this.ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"${message}"}{i:0}{s:""}`))
    }
}