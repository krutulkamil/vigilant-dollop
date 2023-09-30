import type { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

import { verifyJwt } from '../utils/jwt.utils';
import { log } from '../utils/logger';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  if (!accessToken) return next();

  const { expired, decoded } = verifyJwt(accessToken, 'accessTokenPublicKey');
  log.info(`Deserializing user ${decoded}`);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};
