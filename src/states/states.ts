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
    antiafk: true,
    antispam: false,
    antiturn: true,
    antityping: true,
    blockmove: false,
    floodclick: false,
    blockclick: true,
    stay: false,
    clonetext: false,
    floodhanditem: false
}