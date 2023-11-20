import { Client } from "discord.js";
import { Event } from "./Event";

export class EventHandler {
    private client: Client;

    add(event: Event) {
        if (event.once) this.client.once(event.name, event.execute);
        else this.client.on(event.name, event.execute);
    }

    constructor(client: Client) {
        this.client = client;
    }
}