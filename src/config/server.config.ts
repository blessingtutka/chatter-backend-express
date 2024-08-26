import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  sessionSecret: string;
  googleClientId: string;
  googleClientSecret: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'chatter-secret-key',
  sessionSecret: process.env.SESSION_SECRET || 'csession-secret-key',
  googleClientId: process.env.GOOGLE_CLIENT_ID || 'clientID',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
};

export default config;
