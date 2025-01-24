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
        this.figureString = "hd-209-97554.hr-11097-61-40.lg-10944-107574.ch-3935-91-1408.ca-11261-73.cc-3744-90-90.wa-3798-1325-92.fa-11087-1408"
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