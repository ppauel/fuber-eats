import { ActivityType, Client, Events } from "discord.js";
import { commandHandler } from "../bot";
import { Event } from "../classes/Event";
import { Schedule } from "../classes/Schedule";

const event = new Event();
event.name = Events.ClientReady;
event.once = true;
event.execute = async (client: Client) => {
    console.log(`Logged in as ${client.user?.tag}`);

    // Register commands
    await commandHandler.register().then(cmds => console.log(`Registered ${cmds?.size ?? 0} command(s)`)).catch(console.error);

    // Setup schedule
    const schedule = new Schedule(client);
    await schedule.loop().catch(console.error);
}

export default event;
