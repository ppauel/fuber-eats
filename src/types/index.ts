import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export type JSONCommand = RESTPostAPIChatInputApplicationCommandsJSONBody;

export type MOTDMealPrice = { student: number, medium: number, expensive: number };

export type MOTDMealTag = SingleTag | Record<RecordKey, RecordValue>;

export interface MOTD {
    date: string;
    groups: {
        name: string;
        meals: MOTDMeal[];
    }[];
}

export interface MOTDMeal {
    name: string;
    price?: MOTDMealPrice;
    tags: MOTDMealTag[];
}

export const RecordKeyEmojis = {
    Co2: "💨",
    WaterUsage: "💧",
    Quality: "💪"
}

export enum MensaID {
    Mensa1 = "323",
    Mensa2 = "322",
    MensaHerrenhausDueppel = "271",
    MensaKoserstrasse = "660",
    MensaMalteserstrasse = "528",
    MensaPharmazie = "542"
}

export enum MensaName {
    Mensa1 = "Mensa 1 Shokudō",
    Mensa2 = "Mensa 2",
    MensaHerrenhausDueppel = "Mensa Herrenhaus Düppel",
    MensaKoserstrasse = "Mensa Koserstraße",
    MensaMalteserstrasse = "Mensa Malteserstraße",
    MensaPharmazie = "Mensa Pharmazie"
}

export enum SingleTag {
    Vegan = "Vegan",
    Vegetarian = "Vegetarisch",
    Fairtrade = "Fairtrade",
    ClimateFood = "ClimateFood",
    SustainableFarming = "SustainableFarming",
    SustainableFishing = "SustainableFishing",
    Frozen = "Frozen"
}

export enum RecordKey {
    Co2 = "Co2",
    WaterUsage = "WaterUsage",
    Quality = "Quality"
}

export enum RecordValue {
    Red = "Red",
    Orange = "Orange",
    Green = "Green"
}

export enum Dates {
    Today = "today",
    Tomorrow = "tomorrow",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday"
}

export const MensaLinks = {
    "323": "https://www.stw.berlin/mensen/einrichtungen/freie-universität-berlin/shokudo.html",
    "322": "https://www.stw.berlin/mensen/einrichtungen/freie-universität-berlin/mensa-fu-ii.html",
    "271": "https://www.stw.berlin/mensen/einrichtungen/freie-universität-berlin/mensa-fu-herrenhaus-düppel.html",
    "660": "https://www.stw.berlin/mensen/einrichtungen/freie-universität-berlin/mensa-fu-koserstraße.html",
    "528": "https://www.stw.berlin/mensen/einrichtungen/freie-universität-berlin/mensa-fu-lankwitz-malteserstraße.html",
    "542": "https://www.stw.berlin/mensen/einrichtungen/freie-universit%C3%A4t-berlin/mensa-fu-pharmazie.html"
}


export const RecordValueEmojis = {
    Red: "🔴",
    Orange: "🟠",
    Green: "🟢"
}

export const SingleTagEmojis = {
    Vegan: "🇻",
    Vegetarian: "🌱",
    Fairtrade: "🤝",
    ClimateFood: "🌍",
    SustainableFarming: "🌾",
    SustainableFishing: "🐟",
    Frozen: "❄️"
}