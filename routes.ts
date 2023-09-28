import { Express, Request, Response } from 'express';

export const routes = (app: Express) => {
  app.get('/healthcheck', (_: Request, res: Response) => {
    res.sendStatus(200);
  });
};
