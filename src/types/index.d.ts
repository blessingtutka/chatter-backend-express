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
