import { Client, Collection } from "discord.js";
import { Command } from "./Command";

export class CommandHandler {
    private client: Client;
    readonly commands: Collection<string, Command> = new Collection();

    add(command: Command) {
        this.commands.set(command.name, command);
    }

    async register() {
        const commandData = Array.from(this.commands.values(), command => command.builder);
        return await this.client.application?.commands.set(commandData);
    }

    constructor(client: Client) {
        this.client = client;
    }
}