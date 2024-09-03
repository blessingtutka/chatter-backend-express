import prisma from '../../config/db.config';

const userModel = prisma.user;

async function getUser(userId: string) {
  try {
    const user = await userModel.findUnique({
      where: {
        userId: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new Error(`User not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

const getUserByEmail = async (email: string) => {
  try {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return userWithEmail;
  } catch {
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

async function deleteUser(userId: string) {
  try {
    await userModel.delete({
      where: {
        userId: userId,
      },
    });
  } catch (error: any) {
    throw new Error(`Error deleting account: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export { getUser, getUserByEmail, deleteUser };
