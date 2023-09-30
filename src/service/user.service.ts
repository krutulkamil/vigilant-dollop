import { omit } from 'lodash';
import type { FilterQuery } from 'mongoose';

import type { IUserDocument } from '../models/user.model';
import { UserModel } from '../models/user.model';
import { log } from '../utils/logger';
import type { TCreateUserSchema } from '../schema/user.schema';

export const createUser = async (input: TCreateUserSchema) => {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (error) {
    if (error instanceof Error) {
      log.error(`User Service Error: ${error.message}`);
      throw new Error(error.message);
    }

    log.error(`User Service Error: ${error}`);
    throw new Error('User Service: An unexpected error occurred');
  }
};

interface IValidatePassword {
  email: string;
  password: string;
}

export const validatePassword = async ({
  email,
  password,
}: IValidatePassword) => {
  const user = await UserModel.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

export const findUser = (query: FilterQuery<IUserDocument>) => {
  return UserModel.findOne(query).lean();
};
