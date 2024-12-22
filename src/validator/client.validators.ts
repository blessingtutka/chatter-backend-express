import { ValidationError, ClientInput } from './interfaces';

export const validateClient = (
  client: Partial<ClientInput>,
): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!client.email)
    errors.push({ field: 'email', message: 'Email is required' });
  if (!client.name) errors.push({ field: 'name', message: 'Name is required' });
  if (!client.message)
    errors.push({ field: 'message', message: 'Message is required' });
  return errors;
};
