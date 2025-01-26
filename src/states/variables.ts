import { HPoint } from "gnode-api"

export interface VariablesInterface {
    cloningUserId: number
    stayPos: HPoint
}

export const variables: VariablesInterface = {
    cloningUserId: 0,
    stayPos: new HPoint(0, 0),
}