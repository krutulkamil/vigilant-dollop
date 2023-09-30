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
  accessTokenPrivateKey: process.env.ACCESS_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
};
