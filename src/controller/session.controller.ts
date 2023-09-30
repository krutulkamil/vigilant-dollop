import type { Request, Response } from 'express';
import config from 'config';

import { validatePassword } from '../service/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import { log } from '../utils/logger';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  try {
    // Validate the user password
    const user = await validatePassword(req.body);
    if (!user) return res.status(401).send({ error: 'Invalid email/password' });

    // Create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // Create access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      'accessTokenPrivateKey',
      { expiresIn: config.get<string>('accessTokenTtl') }
    );

    // Create refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      'refreshTokenPrivateKey',
      { expiresIn: config.get<string>('refreshTokenTtl') }
    );

    // Send refresh & access token back
    log.info('Session Controller: Session created successfully');
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      log.error(`Session Controller Error: ${error.message}`);
      return res.status(401).send({ error: 'Unauthorized' });
    }

    return res
      .status(500)
      .send({ error: 'Session Controller: An unexpected error occurred' });
  }
};

export const getUserSessionsHandler = async (_: Request, res: Response) => {
  const userId = res.locals.user._id;
  log.info(`Session Controller: Getting sessions for user ${userId}`);

  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).send(sessions);
};

export const deleteUserSessionHandler = async (_: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });
  return res.status(200).send({ accessToken: null, refreshToken: null });
};
