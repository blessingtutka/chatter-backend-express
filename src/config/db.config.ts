import { PrismaClient, UserType } from '@prisma/client';
import type { User, Profile, Otp } from '@prisma/client';

const prisma = new PrismaClient();

export { UserType, User, Profile, Otp };

export default prisma;
