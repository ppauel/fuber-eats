
import { Events, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { Event } from "../classes/Event";

const event = new Event();
event.name = Events.MessageReactionAdd;
event.execute = async (messageReaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    if (messageReaction.partial) {
        console.log("Fetching partial message reaction...")
        await messageReaction.fetch().catch(console.error);
    }
    if (user.partial) {
        console.log("Fetching partial user...")
        await user.fetch().catch(console.error);
    }
    if (user.bot) {
        return;
    }

    console.log("Fetching partial message...")
    const message = await messageReaction.message.fetch().catch(console.error);
    if (message) {
        message.reactions.cache.forEach(async (reaction) => {
            console.log("Fetching partial reaction users...")
            const users = await reaction.users.fetch();
            const sameEmoji =
                reaction.emoji.name === messageReaction.emoji.name &&
                reaction.emoji.id === messageReaction.emoji.id;
            if (users.has(user.id) && !sameEmoji) {
                await reaction.users.remove(user.id).catch(console.error);
            }
        });
    }
}

export default event;