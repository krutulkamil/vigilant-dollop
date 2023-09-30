import { z } from 'zod';

export const createSessionSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email address'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password too short - should be 6 chars minimum')
      .max(24, 'Password too long - should be 24 chars maximum'),
  }),
});
