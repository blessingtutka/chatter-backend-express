import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  databaseUrl: string;
  otpSchedule: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  otpSchedule: '0 0 * * *',
};

export default config;
