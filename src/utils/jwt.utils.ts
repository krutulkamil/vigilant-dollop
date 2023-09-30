import jwt from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  object: jwt.JwtPayload,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions
) => {
  const signingKey = config.get<string>(keyName);

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = (
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) => {
  const publicKey = config.get<string>(keyName);

  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return {
        valid: false,
        expired: error.message === 'jwt expired',
        decoded: null,
      };
    }

    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
};
