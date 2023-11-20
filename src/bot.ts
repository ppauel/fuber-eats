import { Client, GatewayIntentBits as Intents, Options, Partials } from "discord.js";
import "dotenv/config";
import { CommandHandler } from "./classes/CommandHandler";
import { EventHandler } from "./classes/EventHandler";
import * as commands from "./commands";
import * as events from "./events";

const client: Client = new Client({
    intents: [
        Intents.Guilds,
        Intents.GuildMembers,
        Intents.GuildMessages,
        Intents.GuildMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User
    ],
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        // Caching
        UserManager: {
            maxSize: 1023,
            keepOverLimit: user => user.id === client.user?.id,
        },
        GuildMemberManager: {
            maxSize: 1023,
            keepOverLimit: member => member.id === client.user?.id,
        },
        ReactionManager: 1024,
        GuildEmojiManager: 1024,
        BaseGuildEmojiManager: 1024,
        ReactionUserManager: 1024,
        MessageManager: 1024,
        // No caching
        GuildBanManager: 0,
        AutoModerationRuleManager: 0,
        VoiceStateManager: 0,
        GuildInviteManager: 0,
        StageInstanceManager: 0,
        GuildStickerManager: 0,
        GuildScheduledEventManager: 0,
        ThreadMemberManager: 0,
        ThreadManager: 0,
        GuildForumThreadManager: 0,
        GuildTextThreadManager: 0,
        PresenceManager: 0
    }),
});

// Register commands
export const commandHandler = new CommandHandler(client);
for (const command of Object.values(commands)) {
    commandHandler.add(command);
}

// Register events
export const eventHandler = new EventHandler(client);
for (const event of Object.values(events)) {
    eventHandler.add(event);
}

client.login(process.env.DISCORD_TOKEN);