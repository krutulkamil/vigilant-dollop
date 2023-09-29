import { UserModel } from '../models/user.model';
import { log } from '../utils/logger';
import type { TCreateUserSchema } from '../schema/user.schema';

export const createUser = async (input: TCreateUserSchema) => {
  try {
    return await UserModel.create(input);
  } catch (error) {
    if (error instanceof Error) {
      log.error(`User Service Error: ${error.message}`);
      throw new Error(error.message);
    }

    log.error(`User Service Error: ${error}`);
    throw new Error('User Service: An unexpected error occurred');
  }
};
