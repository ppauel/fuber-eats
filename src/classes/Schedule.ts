import { Client } from "discord.js";
import discordConfig from "../discord.json";
import { FUberEatsAPI } from "./FUberEatsAPI";
import { MensaID } from "../types";
import { dateToDateString } from "../utilities/format";

export class Schedule {
    private api: FUberEatsAPI;

    async send(date: string) {
        await this.api.updateMotd(MensaID.Mensa1, date, discordConfig[MensaID.Mensa1].channel).catch(console.error);
        await this.api.updateMotd(MensaID.Mensa2, date, discordConfig[MensaID.Mensa2].channel).catch(console.error);
        await this.api.updateMotd(MensaID.MensaHerrenhausDueppel, date, discordConfig[MensaID.MensaHerrenhausDueppel].channel).catch(console.error);
        await this.api.updateMotd(MensaID.MensaKoserstrasse, date, discordConfig[MensaID.MensaKoserstrasse].channel).catch(console.error);
        await this.api.updateMotd(MensaID.MensaMalteserstrasse, date, discordConfig[MensaID.MensaMalteserstrasse].channel).catch(console.error);
        await this.api.updateMotd(MensaID.MensaPharmazie, date, discordConfig[MensaID.MensaPharmazie].channel).catch(console.error);
    }

    async loop() {
        const date = new Date();
        const dateString = dateToDateString(date);
        await this.send(dateString);

        // Schedule next update
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0, 0);
        const timeout = date.getTime() - Date.now();
        console.log(`Next update in ~${(timeout / 1000 / 60 / 60).toFixed(0)} hours`);
        setTimeout(() => {
            this.loop();
        }, timeout);
    }

    constructor(client: Client) {
        this.api = new FUberEatsAPI(client);
    }
}