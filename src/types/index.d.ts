// TYPES
type AnyObject = { [key: string]: any };

type TAccount = {
  username: string;
  email: string;
  password: string;
};

type TUser = {
  username?: string;
  email?: string;
  type?: string;
  isActive?: boolean;
};

type TProfile = {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
};

type EmailType = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  template?: string;
  context?: {
    [key: string]: any;
  };
};

type ResetEmailType = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  template?: string;
  context?: {
    firstName?: string;
    resetLink: string;
  };
};

type OtpEmailType = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  template?: string;
  context?: {
    firstName?: string;
    otpCode: string;
    expiresIn: number;
  };
};
