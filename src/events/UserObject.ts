import { Extension, HDirection, HMessage } from "gnode-api"
import { createConsole } from "../functions/initialize"

export interface userObjectInterface {
    id: number | undefined
    name: String | undefined
    fullId: String | undefined
    genre: "M" | "F" | undefined
    motto: String | undefined
    index?: Number
}

export let userObject: userObjectInterface = {
    id: undefined,
    name: undefined,
    fullId: undefined,
    genre: undefined,
    motto: undefined
}

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket();
    const [id, name, fullId, genre, motto ] = packet.read('iSSSSS')
    
    ext.userObject = {
        id,
        name,
        fullId,
        genre,
        motto
    }

    createConsole(ext)
}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'UserObject',
}