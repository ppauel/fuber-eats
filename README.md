<div align="center">

![small](https://github.com/ppauel/speiseplan-bot/assets/82803315/95e67491-769f-46b6-b146-0dbd16727b79)
  
# Speiseplan Bot

Receive the daily menu in your Discord Server. \
The bot broadcasts the menu of all available *Freie Universität* canteens to selected channels every 24 hours. \
The [API](https://github.com/davidHarwardt/stw-mensa-api) uses https://www.stw.berlin as the source.

</div>

## Additional Commands
* `/speiseplan <tag> <mensa>` displays the specified menu

## Setup

### Prerequisites
* STW Berlin API Server: https://github.com/davidHarwardt/stw-mensa-api
* Discord Application (Bot): https://discord.dev

### Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` as shown in `.env.example`
4. Specify Discord channels and roles in `src/discord.json`
5. Invite the bot to your server & configure permissions

### Scripts
* `npm run start` builds & starts the bot
* `npm run build` builds the bot into the `dist/` folder
* `npm run dev` starts the bot without compiling

If you want to host the bot using PM2, run `pm2 start ecosystem.config.js`.

## Contributing & Customizing
* **Canteens** are defined in `src/types/index.ts`.
* **Scheduled Canteens** are managed in `src/classes/Schedule.ts`.
* **Slash Commands** are stored in `src/commands/` and need to be indexed in `./index.ts`.
* **Client Events** are stored in `src/events/` and need to be indexed in `./index.ts`.
