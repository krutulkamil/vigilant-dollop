import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Not a valid email address'),
      name: z
        .string({
          required_error: 'Name is required',
        })
        .min(2, 'Name too short - should be 2 chars minimum')
        .max(24, 'Name too long - should be 24 chars maximum'),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(6, 'Password too short - should be 6 chars minimum')
        .max(24, 'Password too long - should be 24 chars maximum'),
      passwordConfirmation: z
        .string({
          required_error: 'Password confirmation is required',
        })
        .min(
          6,
          'Password confirmation is too short - should be 6 chars minimum'
        )
        .max(24, 'Password confirmation too long - should be 24 chars maximum'),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

export type TCreateUserSchema = z.TypeOf<typeof createUserSchema>;
