import prisma from '../../config/db.config';

const optTable = prisma.otp;

interface CreateOtpInput {
  userId: string;
  expiresAt: Date;
  code: string;
}

export const createOpt = async (input: CreateOtpInput) => {
  const { userId, expiresAt, code } = input;
  try {
    const newOtp = await optTable.create({
      data: {
        userId,
        expiresAt,
        code,
      },
      include: {
        user: true,
      },
    });
    return newOtp;
  } catch (error: any) {
    throw new Error(`Error creating otp: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const verifyOpt = async (userId: string, code: string) => {
  try {
    const otp = await optTable.findUnique({
      where: {
        userId,
        code,
      },
    });
    if (!otp) {
      throw new Error('Invalid OTP');
    }

    if (otp.expiresAt < new Date()) {
      throw new Error('OTP expired');
    }

    return otp;
  } catch (error: any) {
    throw new Error(`Error fetching otp: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const findOpt = async (userId: string) => {
  try {
    const otp = await optTable.findUnique({
      where: {
        userId,
      },
    });

    if (!otp) {
      throw new Error('Invalid OTP');
    }

    return otp;
  } catch (error: any) {
    throw new Error(`Error fetching otp: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteExpiredOtps = async () => {
  try {
    const result = await optTable.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return result;
  } catch (error: any) {
    throw new Error(`Error deleting expired otps: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};
