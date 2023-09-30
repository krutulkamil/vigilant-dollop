import type { FilterQuery, UpdateQuery } from 'mongoose';

import type { ISessionDocument } from '../models/session.model';
import { SessionModel } from '../models/session.model';
import { log } from '../utils/logger';

export const createSession = async (userId: string, userAgent: string) => {
  try {
    return await SessionModel.create({ user: userId, userAgent });
  } catch (error) {
    if (error instanceof Error) {
      log.error(`Session Service (CREATE) Error: ${error.message}`);
      throw new Error(error.message);
    }

    log.error(`Session Service (CREATE) Error: ${error}`);
    throw new Error('Session Service: An unexpected error occurred');
  }
};

export const findSessions = async (query: FilterQuery<ISessionDocument>) => {
  try {
    return await SessionModel.find(query).lean();
  } catch (error) {
    if (error instanceof Error) {
      log.error(`Session Service (FIND) Error: ${error.message}`);
      throw new Error(error.message);
    }

    log.error(`Session Service (FIND) Error: ${error}`);
    throw new Error('Session Service: An unexpected error occurred');
  }
};

export const updateSession = async (
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) => {
  try {
    return await SessionModel.updateOne(query, update);
  } catch (error) {
    if (error instanceof Error) {
      log.error(`Session Service (UPDATE) Error: ${error.message}`);
      throw new Error(error.message);
    }

    log.error(`Session Service (UPDATE) Error: ${error}`);
    throw new Error('Session Service: An unexpected error occurred');
  }
};
