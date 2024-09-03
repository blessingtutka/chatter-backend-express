import prisma from '../../config/db.config';

const userModel = prisma.user;

import bcrypt from 'bcrypt';

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

async function createAccount(input: CreateUserInput) {
  const { username, email, password } = input;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });

    return newUser;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function validateUserAndPassword(email: string, password: string) {
  try {
    const user = await userModel.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(`Error verifying user: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export { createAccount, validateUserAndPassword };
