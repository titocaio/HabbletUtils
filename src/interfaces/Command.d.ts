import { Ext } from "../classes/Extension";

export interface Command {
    run: (ext: Ext, args: string[], from: "Chat" | "Console") => void; // Function executed by the command
    config: {
        name: string; // Command name
        description: string; // Command description
    };
}