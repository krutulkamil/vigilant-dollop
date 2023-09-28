import dotenv from 'dotenv';

dotenv.config();

export default {
  port: 1337,
  https: false,
  host: 'localhost',
  dbUri: process.env.MONGO_DB_URI,
}