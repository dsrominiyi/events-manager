import { MongoClient } from 'mongodb';

const { DB_URL = '' } = process.env;

const mongoClient = new MongoClient(DB_URL);

export default mongoClient;
