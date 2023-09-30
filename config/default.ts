import dotenv from 'dotenv';

dotenv.config();

export default {
  port: 1337,
  https: false,
  host: 'localhost',
  dbUri: process.env.MONGO_DB_URI,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
