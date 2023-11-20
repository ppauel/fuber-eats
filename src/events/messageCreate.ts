import { ChannelType, Events, Message } from "discord.js";
import discordConfig from "../discord.json";
import { Event } from "../classes/Event";

const event = new Event();
event.name = Events.MessageCreate;
event.execute = async (message: Message) => {
    if (!message.guild) return;
    if (message.channel.type !== ChannelType.GuildText) return;

    // Remove pinned system messages
    if (Object.values(discordConfig).map(c => c.channel).includes(message.channel.id) && message.system) {
        await message.delete().catch((console.error));
    }
}

export default event;