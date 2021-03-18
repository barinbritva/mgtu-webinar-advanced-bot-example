# Requirements

* Node.js, NPM
* MongoDB

# Launch

* Open [BotFather](https://t.me/BotFather) and register your bot
* Copy `.env.example` as `.env`
* Open `.env`, set `NODE_ENV` as `development`, put your bot token to `BOT_TOKEN`, put MongoDB connection options
* Run `npm install`
* Run `npm start`

# Usage

Open your bot using mention like `@mybotname` or by link like `https://t.me/mybotname`.

* Send `/help` command to bot
* Send `/profile` command to get examples of inline and keyboard buttons
* Input `@mybotname` and after whitespace start typing to get an example of autocomplete

# The code

The main things happens in `src/app/services/router.ts` and files from `src/modules/**`.

# Troubleshooting

Contact me using contacts from my profile if something went wrong.

# Credits
Bootstrapped with [init-typescript-app](https://github.com/barinbritva/init-typescript-app).
