import { z } from 'zod';

export const createTaskSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>;
