import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  host: string;
}

const redisConfig: Config = {
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  host: process.env.REDIS_HOST || 'localhost',
};

export default redisConfig;
