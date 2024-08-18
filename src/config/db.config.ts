import { PrismaClient, UserType } from '@prisma/client';
import type { User, Profile } from '@prisma/client';

const prisma = new PrismaClient();

export { UserType, User, Profile };

export default prisma;
