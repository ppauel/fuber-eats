import { ChatInputCommandInteraction, DiscordAPIError, DiscordjsErrorCodes, Events, Interaction, inlineCode } from "discord.js";
import { commandHandler } from "../bot";
import { Event } from "../classes/Event";
import { ignoreError } from "../utilities/errorHandling";

const event = new Event();
event.name = Events.InteractionCreate;
event.execute = async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        const command = commandHandler.commands.get(interaction.commandName);
        if (command) {
            await command.execute(interaction as ChatInputCommandInteraction).catch(e => {
                console.error(e);
                const errorMessage = `⚠️ Ein Fehler ist aufgetreten: ${inlineCode((e as Error).message)}`;
                interaction.reply({ content: errorMessage, ephemeral: true }).catch(async dE => {
                    if ((dE as DiscordAPIError).code === DiscordjsErrorCodes.InteractionAlreadyReplied) {
                        await interaction.followUp({ content: errorMessage , ephemeral: true }).catch(ignoreError);
                    }
                });
            });
        } else {
            console.warn(`Unknown command executed: ${interaction.commandName}`)
        }
    }
}

export default event;