import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
// import { session } from 'telegraf-session-mongodb';
// import { MongoClient } from 'mongodb';
import { BotContext } from './core/interfaces/bot-context';

dotenv.config();

console.log(process.env.BOT_TOKEN, process.env.NODE_ENV);

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);
// MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(client => {
//     const db = client.db();
//     bot.use(session(db, { collectionName: 'sessions' }));
//   });

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();