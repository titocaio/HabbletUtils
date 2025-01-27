import { Extension, HEntity, HMessage, HPacket } from 'gnode-api'
import { readdirSync } from 'fs'
import { ExtensionInfo } from 'gnode-api/lib/extension/extensioninfo';
import { states, StatesInterface } from '../states/states';
import { Command } from '../interfaces/Command';
import { intervals, IntervalsInterface } from '../states/intervals';
import { join } from 'path';
import { Event } from '../interfaces/Event';
import { Console } from './Console';
import { userObjectInterface } from '../interfaces/UserObject';
import { variables, VariablesInterface } from '../states/variables';
import { commandsPre, eventsPre} from '../prebuilt-index'

export class Ext extends Extension {
    commands: Map<string, Command>;
    events: Map<string, Event>;
    states: StatesInterface
    intervals: IntervalsInterface
    userObject: userObjectInterface
    roomUsers: HEntity[]
    variables: VariablesInterface

    constructor(options: ExtensionInfo) {
        super(options);

        this.commands = new Map();
        this.events = new Map();
        this.states = states
        this.intervals = intervals
        this.userObject = {
            id: undefined,
            name: undefined,
            fullId: undefined,
            genre: undefined,
            motto: undefined
        }
        this.roomUsers = []
        this.variables = variables

        this.initialize();
    }

    private initialize(): void {
        this.loadCommands();
        this.loadEvents();

        this.on("start", () => {
            setTimeout(() => {
                new Console(this)
                this.sendToServer(new HPacket(`{out:InfoRetrieve}`))
            }, 250)
        })

        this.on("end", () => {
            this.roomUsers = []
            this.userObject = {
                id: undefined,
                name: undefined,
                fullId: undefined,
                genre: undefined,
                motto: undefined
            }
            this.states = states
            
            for (const [key, interval] of Object.entries(this.intervals)) {
                if (interval !== null) {
                    clearInterval(interval)
                    this.intervals[key] = null
                }
            }
        })
    }

    async loadCommands() {
        for (const [name, command] of Object.entries(commandsPre)) {
            this.commands.set(name, command);
            console.log(`[LOG COMMANDS] Loaded command - [${name}]`);
        }
    }

    async loadEvents() {
        for (const [name, event] of Object.entries(eventsPre)) {
            if (typeof event.config.header === "string") {
                this.interceptByNameOrHash(
                    event.config.direction,
                    event.config.header,
                    (hMessage: HMessage) => event.run(this, hMessage)
                );
            } else if (typeof event.config.header === "number") {
                this.interceptByHeaderId(
                    event.config.direction,
                    event.config.header,
                    (hMessage: HMessage) => event.run(this, hMessage)
                );
            }
    
            console.log(`[LOG EVENTS] Loaded event - [${name}]`);
        }
    }
}