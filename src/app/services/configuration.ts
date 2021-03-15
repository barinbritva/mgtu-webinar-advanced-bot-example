export class Configuration {
  public readonly botToken: string;
  public readonly mongoConnectUri: string

  constructor() {
    this.botToken = process.env.BOT_TOKEN;

    const mongoUserUri: string = process.env.MONGO_USER && process.env.MONGO_PASSWORD
      ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
      : '';
    this.mongoConnectUri = `mongodb://${mongoUserUri}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  }
}
