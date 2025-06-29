export interface StatesInterface {
    login: boolean
    antiafk: boolean
    antispam: boolean
    antiturn: boolean
    antityping: boolean
    blockmove: boolean
    floodclick: boolean
    blockclick: boolean
    stay: boolean
    clonetext: boolean
    floodhanditem: boolean
}

export const states: StatesInterface = {
    login: false,
    antiafk: false,
    antispam: false,
    antiturn: false,
    antityping: false,
    blockmove: false,
    floodclick: false,
    blockclick: false,
    stay: false,
    clonetext: false,
    floodhanditem: false
}