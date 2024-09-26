import { schedule } from 'node-cron';
import { deleteExpiredOtps } from './otp.service';
import config from '../../config/server.config';

const handleExpiredOtpsDeletion = async () => {
  try {
    await deleteExpiredOtps();
  } catch (error: any) {
    throw Error(error);
  }
};

export const startOtpCrons = () => {
  schedule(config.otpSchedule, handleExpiredOtpsDeletion);
};
