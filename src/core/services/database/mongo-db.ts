import {MongoClient} from 'mongodb';

export abstract class MongoDb {
  private static connection: MongoClient | null = null;

  public static openConnection(mongoConnectUri: string): Promise<MongoClient> {
    if (MongoDb.connection == null) {
      return MongoClient.connect(mongoConnectUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((connection) => {
          MongoDb.connection = connection;
          return connection;
        })
    } else {
      return Promise.resolve(MongoDb.connection);
    }
  }

  public static closeConnection(): Promise<void> {
    if (MongoDb.connection == null) {
      return Promise.resolve();
    } else {
      return MongoDb.connection.close();
    }
  }
}
