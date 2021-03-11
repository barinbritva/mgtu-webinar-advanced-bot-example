import dotenv from 'dotenv';
import {Telegraf, Scenes} from 'telegraf';
import {session} from 'telegraf-session-mongodb';
import {MongoClient} from 'mongodb';
import {AppContext} from './core/interfaces/app-context';
import {Configuration} from './core/services/configuration/Configuration';
import {helpController} from './modules/common/controller/help-controller';
import {MongoDb} from './core/services/database/mongo-db';

dotenv.config();

const config = new Configuration();
const bot = new Telegraf<AppContext>(process.env.BOT_TOKEN);

MongoDb.openConnection(config.mongoConnectUri)
  .then((dbClient) => {
      return runApp(dbClient);
  })
  .then(() => {
      console.info('App started.');
  })
  .catch((error) => {
      console.error('Failed to start app.', error);
  })

function runApp(dbClient: MongoClient): Promise<void> {
    const stage = new Scenes.Stage<AppContext>([helpController]);

    bot.use(session(dbClient.db(), {collectionName: 'sessions'}));
    bot.use(stage.middleware());

    bot.help(Scenes.Stage.enter('help'));
    bot.hears('hi', (ctx) => {
        console.info('???', ctx.session);
        ctx.reply('Nice to see you');
    })

    return bot.launch();
}

function stopApp(reason?: string) {
    bot.stop(reason);
    MongoDb.closeConnection()
        .catch((error) => {
            console.error('Failed to close DB connection.', error);
        });
}

process.once('SIGINT', () => {
    stopApp('SIGINT')
})
process.once('SIGTERM', () => {
    stopApp('SIGTERM')
})
