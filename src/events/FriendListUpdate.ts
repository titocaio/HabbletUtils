import { Extension, HDirection, HFriend, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket()
    
    for (let friend of HFriend.parseFromUpdate(packet)) {
    }
}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'FriendListUpdate',
}