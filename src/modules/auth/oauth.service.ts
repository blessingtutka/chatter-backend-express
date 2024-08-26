import prisma from '../../config/db.config';

const userModel = prisma.user;

interface CreateUserInput {
  googleId: string;
  username: string;
  avatarUrl?: string;
  email: string;
}

async function creategoogleAccount(input: CreateUserInput) {
  const { username, email, googleId, avatarUrl } = input;

  try {
    const newUser = await userModel.create({
      data: {
        googleId,
        username,
        email,
        password: '',
        profile: {
          create: {
            avatarUrl,
          },
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

const getUserByGoogleId = async (googleID: string) => {
  try {
    const googleUser = await prisma.user.findUnique({
      where: {
        googleId: googleID,
      },
    });
    return googleUser;
  } catch {
    return null;
  }
};

export { creategoogleAccount, getUserByGoogleId };
