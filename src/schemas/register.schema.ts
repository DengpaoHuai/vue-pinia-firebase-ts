import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,32}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
});
