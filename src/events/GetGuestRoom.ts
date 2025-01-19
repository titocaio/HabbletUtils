import { Extension, HDirection, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
    const myUser = ext.roomUsers.find(user => user.id === ext.userObject.id)
    if (!myUser) return ext.userObject.index = 0
    ext.userObject.index= myUser.index
}

export const config = {
    direction: HDirection.TOSERVER,
    header: 'GetGuestRoom',
}