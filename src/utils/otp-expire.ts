import { addMinutes } from 'date-fns';

export const otpExpiresAt = addMinutes(new Date(), 10);
