import type { Express, Request, Response } from 'express';

import { createUserHandler } from './controller/user.controller';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import { validateResource } from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { requireUser } from './middleware/requireUser';

export const routes = (app: Express) => {
  app.get('/api/healthcheck', (_: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);
};
