import { Client, EmbedBuilder, GuildTextBasedChannel, InteractionReplyOptions, MessageCreateOptions, roleMention } from "discord.js";
import discordConfig from "../discord.json";
import { MOTD, MensaID, MensaLinks } from "../types";
import { cleanPrice, cleanTag, mensaIdToName } from "../utilities/format";

export class FUberEatsAPI {
    private client: Client;

    async getMotdData(mensa?: MensaID, date?: string): Promise<MOTD> {
        if (!process.env.API_HOST) throw new Error("API_HOST is not defined");

        const baseUrl = `${process.env.API_HOST}/menu`;
        const url = new URL(baseUrl);
        if (mensa) {
            url.searchParams.append('mensa', mensa);
        }
        if (date) {
            url.searchParams.append('date', date);
        }
        const request = new Request(url.toString());

        return await fetch(request).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`API Server Error: ${res.status} ${res.statusText}`);
            }
        });
    }

    async getMotdPayload(mensa: MensaID, date: string, withMention = false): Promise<MessageCreateOptions | InteractionReplyOptions> {
        const embeds: EmbedBuilder[] = [];
        const content = `# [Speiseplan für ${mensaIdToName(mensa)} vom ${new Date(date).toLocaleDateString('de-DE')}](${MensaLinks[mensa]})\n${withMention ? roleMention(discordConfig[mensa].role) : ''}`;
        const motd = await this.getMotdData(mensa, date).catch(console.error);
        if (!motd) throw new Error("Meal of the Day nicht erreichbar");

        motd.groups.forEach(group => {
            const embed = new EmbedBuilder()
                .setTitle(`${group.name}`)
                .setColor("#00488E")

            group.meals.forEach(meal => {
                embed.addFields({ name: meal.name, value: `**Preise:** ${cleanPrice(meal.price)}\n${meal.tags.map(tag => cleanTag(tag)).join(' ')}` });
            });
            embeds.push(embed);
        });

        return { content: content, embeds: embeds };
    }

    async updateMotd(mensa: MensaID, date: string, channelId: string): Promise<void> {
        const channel = await this.client.channels.fetch(channelId).catch(console.error) as GuildTextBasedChannel;
        if (!channel) throw new Error(`Kanal "${channelId}" konnte nicht gefunden werden`);
        const pinnedMessages = await channel.messages.fetchPinned().catch(console.error);

        if (pinnedMessages && pinnedMessages.size > 0) {
            await pinnedMessages.first()?.delete().catch(console.error);
        }
                                                               // disable mentions
        const payload = await this.getMotdPayload(mensa, date, false).catch(console.error);
        if (!payload) throw new Error("Payload konnte nicht geladen werden");

        await channel.send(payload as MessageCreateOptions).then(async msg => await msg.pin().catch(console.error));
    }

    constructor(client: Client) {
        this.client = client;
    }
}