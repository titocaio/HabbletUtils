export interface StatesInterface {
    login: boolean
    antiafk: boolean
    antispam: boolean
    antiturn: boolean
    antityping: boolean
    blockmove: boolean
    floodclick: boolean
}

export const states: StatesInterface = {
    login: false,
    antiafk: true,
    antispam: false,
    antiturn: true,
    antityping: true,
    blockmove: false,
    floodclick: false,
}