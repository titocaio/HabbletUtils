import { Extension, HDirection, HEntity, HEntityType, HMessage } from "gnode-api"

export let roomUsers: HEntity[] = []

export const run = (ext: Extension , hMessage: HMessage) => {
    const packet = hMessage.getPacket()
    const userParser = HEntity.parse(packet)

    if (userParser.length >= 5) return ext.roomUsers = userParser

    for (const user of userParser) {
        if (user.entityType === HEntityType.HABBO) ext.roomUsers.push(user);
    }
}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'Users',
}