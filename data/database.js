import { MongoClient } from 'mongodb';


const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = encodeURIComponent(process.env.MONGODB_USERNAME);
const dbPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let database;

(async () => {
  console.log('Trying to connect to db');

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('✅ Connected successfully to MongoDB Atlas');
    database = client.db(dbName);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    await client.close();
    console.log('Connection closed.');
    process.exit(1); // ❗ prevent app from running with no DB
  }
})();

export default () => database;
