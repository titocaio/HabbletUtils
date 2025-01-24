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

export class Ext extends Extension {
    commands: Map<string, Command>;
    events: Map<string, Event>;
    states: StatesInterface
    intervals: IntervalsInterface
    userObject: userObjectInterface
    roomUsers: HEntity[];

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
        const commandDir = join(process.cwd(), 'src', 'commands');
        const commandFiles = readdirSync(commandDir);

        commandFiles.forEach(file => {
            if (file.endsWith('.ts')) {
                import(join(commandDir, file)).then(commandModule => {
                    const command = commandModule.command;
                    if (command && command.config?.name) {
                        this.commands.set(command.config.name, command);
                        console.log(`[LOG COMMANDS] Carregando o evento - [${file}]`);
                    } else {
                        console.warn(`Command file ${file} is missing a valid export.`);
                    }
                });
            }
        });
    }

    async loadEvents() {
        const path = './src/events';
        const files = readdirSync(path);
        for (const file of files) {
            const eventModule = await import (join(process.cwd(), `${path}/${file}`));
            const event: Event = eventModule.event;
            if (typeof event.config.header === "string") {
                this.interceptByNameOrHash(event.config.direction, event.config.header, (hMessage: HMessage) => event.run(this, hMessage))
            } else if (typeof event.config.header === "number") {
                this.interceptByHeaderId(event.config.direction, event.config.header, (hMessage: HMessage) => event.run(this, hMessage))
            }
            
            console.log(`[LOG EVENTS] Carregando o evento - [${file}]`);
        }
    }
}