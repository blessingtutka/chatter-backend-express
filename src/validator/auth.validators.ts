import { UserType } from '../config/db.config';
import { getUserByEmail } from '../modules/auth/auth.service';
import { ValidationError } from './interfaces';

interface UserInput {
  email: string;
  username: string;
  type: UserType;
  password: string;
}

const USER_TYPES: UserType[] = [
  UserType.ADMIN,
  UserType.MODERATOR,
  UserType.USER,
];

const validateRegistration = async (
  user: UserInput,
): Promise<ValidationError[]> => {
  const exists = await getUserByEmail(user.email);

  const errors: ValidationError[] = [];
  if (!user.email)
    errors.push({ field: 'email', message: 'Email is required' });
  if (!user.username)
    errors.push({ field: 'fullName', message: 'Full name is required' });
  if (!USER_TYPES.includes(user.type))
    errors.push({ field: 'type', message: 'Unknown Type' });
  if (!user.type)
    errors.push({ field: 'type', message: 'User Type is required' });
  if (exists) errors.push({ field: 'email', message: 'Email already exists' });
  return errors;
};

const validateLogin = (user: Partial<UserInput>): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!user.email)
    errors.push({ field: 'email', message: 'Email is required' });
  if (!user.password)
    errors.push({ field: 'password', message: 'Password is required' });
  return errors;
};

export { validateRegistration, validateLogin };