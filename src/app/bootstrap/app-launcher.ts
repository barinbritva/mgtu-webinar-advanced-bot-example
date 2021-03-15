import {Telegraf} from 'telegraf';
import {session} from 'telegraf-session-mongodb';
import {AppContext} from '../interfaces/app-context';
import { Configuration } from '../services/configuration';
import { MongoConnector } from '../services/mongo-connector';
import { Router } from './../services/router';

export class AppLauncher {
  private readonly mongoConnector: MongoConnector;
  private readonly router: Router;
  private readonly bot: Telegraf<AppContext>;

  constructor (
      private readonly config: Configuration
  ) {
    this.mongoConnector = new MongoConnector(this.config.mongoConnectUri);
    this.router = new Router();
    this.bot = new Telegraf(process.env.BOT_TOKEN);
  }

  public async start(): Promise<Telegraf<AppContext>> {
    const dbClient = await this.mongoConnector.open();
    this.bot.use(session(dbClient.db(), {collectionName: 'sessions'}));
    this.router.applyRoutes(this.bot);

    return this.bot
      .launch()
      .then(() => {
        return this.bot;
      });
  }

  public stop(reason?: string): void {
    this.bot.stop(reason);
    this.mongoConnector.close()
    .catch((error) => {
        console.error('Failed to close DB connection.', error);
    });
  }
}
