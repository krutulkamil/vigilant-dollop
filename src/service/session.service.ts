import type { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import config from 'config';

import { SessionModel } from '../models/session.model';
import { log } from '../utils/logger';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import type { ISessionDocument } from '../models/session.model';

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

interface IReIssueAccessToken {
  refreshToken: string;
}

export const reIssueAccessToken = async ({
  refreshToken,
}: IReIssueAccessToken) => {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');
  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));
  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  return signJwt({ ...user, session: session._id }, 'accessTokenPrivateKey', {
    expiresIn: config.get<string>('accessTokenTtl'),
  });
};
