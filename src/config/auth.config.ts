import dotenv from 'dotenv';
dotenv.config();

interface Oauth {
  clientId: string;
  clientSecret: string;
}

interface Secret {
  secret: string;
}

interface AuthConfig {
  jwt: Secret;
  session: Secret;
  google: Oauth;
  facebook: Oauth;
}

const authConfig: AuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'chatter-secret-key',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'csession-secret-key',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'clientID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID || 'clientID',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'clientSecret',
  },
};

export default authConfig;
