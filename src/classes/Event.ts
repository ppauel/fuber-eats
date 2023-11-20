import { ClientEvents } from "discord.js";

export class Event {
    private _name: keyof ClientEvents;
    private _once: boolean = false;
    private _execute: (...args: any[]) => Promise<void>;

    get execute() {
        return this._execute;
    }

    set execute(execute: (...args: any[]) => Promise<void>) {
        this._execute = execute;
    }

    get name() {
        return this._name;
    }

    set name(name: keyof ClientEvents) {    
        this._name = name;
    }

    get once() {
        return this._once;
    }

    set once(once: boolean) {
        this._once = once;
    }
}