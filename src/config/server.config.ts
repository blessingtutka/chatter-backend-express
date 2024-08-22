import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  sessionSecret: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'chatter-secret-key',
  sessionSecret: process.env.SESSION_SECRET || 'csession-secret-key',
};

export default config;
