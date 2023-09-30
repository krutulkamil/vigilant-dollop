import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export const signJwt = (object: jwt.JwtPayload, options?: jwt.SignOptions) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = async (token: string) => {
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
  }
};
