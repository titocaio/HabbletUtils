import { Extension, HDirection, HMessage } from "gnode-api"

export const run = (ext: Extension , hMessage: HMessage) => {

}

export const config = {
    direction: HDirection.TOCLIENT,
    header: 'Sleep',
}