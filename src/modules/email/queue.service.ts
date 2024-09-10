import Bull from 'bull';
import redisConfig from '../../config/redis.config';
import { processEmailQueue } from './email.consumer';

const emailQueue = new Bull('email', {
  redis: `${redisConfig.host}:${redisConfig.port}`,
});

const sendMail = async (email: EmailType) => {
  emailQueue.add({ ...email });
};

emailQueue.process(processEmailQueue);

export { emailQueue, sendMail };
