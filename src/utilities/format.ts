import { MOTDMealPrice, MOTDMealTag, SingleTagEmojis, SingleTag, RecordKeyEmojis, RecordValueEmojis, MensaName, MensaID, Dates } from "../types";

export const cleanPrice = (price?: MOTDMealPrice): string => {
    if (!price) return `N/A`
    const cleanPriceNumber = (price: number) => `${Math.floor(price / 100)},${(price % 100).toString().padEnd(2, "0")}`;
    return `${cleanPriceNumber(price.student)} € / ${cleanPriceNumber(price.medium)} € / ${cleanPriceNumber(price.expensive)} €`;
}

export const cleanTag = (tag: MOTDMealTag): string => {
    if (typeof tag === "string") {
        return `\` ${SingleTagEmojis[tag as unknown as keyof typeof SingleTag]} \``;
    } else {
        const keys = Object.keys(tag);
        const values = Object.values(tag);

        const firstKey = keys[0];
        const firstValue = values[0];

        const key = firstKey as keyof typeof RecordKeyEmojis;
        const value = firstValue as keyof typeof RecordValueEmojis;

        const emojiKey = RecordKeyEmojis[key];
        const emojiValue = RecordValueEmojis[value];

        return `\` ${emojiKey} ${emojiValue} \``;
    }
}

export const mensaIdToName = (mensa: MensaID): MensaName => {
    const indexOfMensa = Object.values(MensaID).indexOf(mensa);
    const mensaIdKey = Object.keys(MensaID)[indexOfMensa] as keyof typeof MensaName;
    return MensaName[mensaIdKey];
}

export const dateNameToDate = (dateString: Dates): Date | null => {
    switch (dateString) {
        case Dates.Today:
            return new Date();
        case Dates.Tomorrow:
            return new Date(new Date().setDate(new Date().getDate() + 1));
        case Dates.Monday:
            return new Date(new Date().setDate(new Date().getDate() + (1 + 7 - new Date().getDay()) % 7));
        case Dates.Tuesday:
            return new Date(new Date().setDate(new Date().getDate() + (2 + 7 - new Date().getDay()) % 7));
        case Dates.Wednesday:
            return new Date(new Date().setDate(new Date().getDate() + (3 + 7 - new Date().getDay()) % 7));
        case Dates.Thursday:
            return new Date(new Date().setDate(new Date().getDate() + (4 + 7 - new Date().getDay()) % 7));
        case Dates.Friday:
            return new Date(new Date().setDate(new Date().getDate() + (5 + 7 - new Date().getDay()) % 7));
        default:
            return null;
    }
}

export const dateToDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
}