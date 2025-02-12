import { z } from 'zod';

const cadeauSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export default cadeauSchema;

export type Cadeau = z.infer<typeof cadeauSchema> & { id: string };
