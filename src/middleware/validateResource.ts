import type { Request, Response, NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

import { log } from '../utils/logger';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        for (const issue of error.issues) {
          log.error(issue.message);
          res.status(400).send(issue.message);
        }
      } else {
        log.error('An unexpected error occurred:', error);
        res.status(400).send(error);
      }
    }
  };
