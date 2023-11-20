import { ApplicationCommandType, InteractionReplyOptions, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/Command";
import { FUberEatsAPI } from "../classes/FUberEatsAPI";
import { Dates, MensaID, MensaName } from "../types";
import { dateNameToDate, dateToDateString } from "../utilities/format";

const command = new Command();
command.name = 'speiseplan';
command.type = ApplicationCommandType.ChatInput;
command.builder = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription('Speiseplan für die Mensa')
    .addStringOption(option => option
        .setName('tag')
        .setDescription('Wähle einen Tag')
        .setRequired(true)
        .setChoices(
            {
                name: "Heute",
                value: Dates.Today
            },
            {
                name: "Morgen",
                value: Dates.Tomorrow
            },
            {
                name: "Montag",
                value: Dates.Monday
            },
            {
                name: "Dienstag",
                value: Dates.Tuesday
            },
            {
                name: "Mittwoch",
                value: Dates.Wednesday
            },
            {
                name: "Donnerstag",
                value: Dates.Thursday
            },
            {
                name: "Freitag",
                value: Dates.Friday
            }
        )
    )
    .addStringOption(option => option
        .setName('mensa')
        .setDescription('Wähle eine Mensa')
        .setRequired(true)
        .setChoices(
            {
                name: MensaName.Mensa1,
                value: MensaID.Mensa1
            },
            {
                name: MensaName.Mensa2,
                value: MensaID.Mensa2
            },
            {
                name: MensaName.MensaHerrenhausDueppel,
                value: MensaID.MensaHerrenhausDueppel
            },
            {
                name: MensaName.MensaKoserstrasse,
                value: MensaID.MensaKoserstrasse
            },
            {
                name: MensaName.MensaMalteserstrasse,
                value: MensaID.MensaMalteserstrasse
            },
            {
                name: MensaName.MensaPharmazie,
                value: MensaID.MensaPharmazie
            }
        )
    )
    .toJSON();
command.execute = async (interaction) => {
    const api = new FUberEatsAPI(interaction.client);
    const mensa = interaction.options.getString('mensa', true) as MensaID;
    const dateName = interaction.options.getString('tag', true) as Dates;
    const date = dateNameToDate(dateName);
    if (!date) throw new Error("Could not parse date");
    const dateString = dateToDateString(date);

    await interaction.deferReply();

    const payload = await api.getMotdPayload(mensa, dateString).catch(console.error);
    if (!payload) throw new Error("Keinen Speiseplan für diesen Tag gefunden");
    await interaction.editReply(payload as InteractionReplyOptions);
}

export default command;