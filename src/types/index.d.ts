type EmailType = {
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
