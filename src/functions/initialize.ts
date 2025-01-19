import { Extension, HPacket } from "gnode-api";

export let chatInitialized = false

export interface ExtensionState {
    antiAfk: boolean;
    antiTurn: boolean;
    antiTyping: boolean;
    antiShowClick: boolean;
    stay: boolean;
    blockMove: boolean;
    selectingUser: boolean;
    selectedUser?: Number;
    clickFlood: boolean;
    selectingHandItemFurni: boolean;
    handItemFurni?: Number;
    handItemFlood: Boolean
}

export const initialState: ExtensionState = {
    antiAfk: true,
    antiTurn: true,
    antiTyping: true,
    antiShowClick: true,
    stay: false,
    blockMove: false,
    selectingUser: false,
    clickFlood: false,
    selectingHandItemFurni: false,
    handItemFlood: false,
};

export async function initilizeExtension(ext: Extension) {
    await delay(100)
    console.log("[Habblet Utils] Connected to hotel")

    // Get (your) habblet  infos
    ext.sendToServer(new HPacket(`{out:InfoRetrieve}`)); 
}

export async function createConsole(ext: Extension) {
    if (chatInitialized) return
    // Create the Habblet Utils console
    ext.sendToClient(new HPacket(`{in:FriendListUpdate}{i:0}{i:1}{i:0}{i:999999999}{s:"Habblet Utils"}{i:1}{b:true}{b:true}{s:"hd-209-97554.hr-11097-61-40.lg-10944-107574.ch-3935-91-1408.ca-11261-73.cc-3744-90-90.wa-3798-1325-92.fa-11087-1408"}{i:0}{s:"this is neither the time nor the place"}{i:0}{i:0}{b:false}`))

    // Send load message
    ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"[Habblet Utils] Loaded"}{i:0}{s:""}`))
    ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"------------------------------------------------"}{i:0}{s:""}`))
    ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"[Habblet Utils] Caso tenha reiniciado a extensão enquanto estava logado em um quarto por favor reentre no quarto. Caso esteja logando pela primeira vez apenas ignore!"}{i:0}{s:""}`))
    ext.sendToClient(new HPacket(`{in:NewConsole}{i:999999999}{s:"------------------------------------------------"}{i:0}{s:""}`))

    setChatInitialized(true)
}

export function setChatInitialized(value: boolean) {
    chatInitialized = value;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
