import {MongoClient} from 'mongodb';

export class MongoConnector {
  private connection: MongoClient | null = null;

  constructor(
    private readonly mongoConnectUri: string
  ) {}

  public open(): Promise<MongoClient> {
    if (this.connection == null) {
        return MongoClient.connect(this.mongoConnectUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((connection) => {
            this.connection = connection;
            return connection;
        })
    } else {
        return Promise.resolve(this.connection);
    }
  }

  public close(): Promise<void> {
    if (this.connection == null) {
        return Promise.resolve();
    } else {
        return this.connection.close();
    }
  }
}
