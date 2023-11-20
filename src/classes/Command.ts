import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { JSONCommand } from "../types";

export class Command {
    private _name: string;
    private _type: ApplicationCommandType;
    private _builder: JSONCommand;
    private _execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

    get execute() {
        return this._execute;
    }

    set execute(execute: (interaction: ChatInputCommandInteraction) => Promise<void>) {
        this._execute = execute;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    set name(name: string) {    
        this._name = name;
    }

    set type(type: ApplicationCommandType) {
        this._type = type;
    }

    get builder() {
        return this._builder;
    }
    
    set builder(builder: JSONCommand) {
        this._builder = builder;
    }
}