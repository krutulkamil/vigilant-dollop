import { UserModel } from '../models/user.model';
import type { TCreateUserSchema } from '../schema/user.schema';

export const createUser = async (input: TCreateUserSchema) => {
  try {
    return await UserModel.create(input);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('User Service: An unexpected error occurred');
  }
};
