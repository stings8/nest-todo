import { z } from 'zod';

export const createTaskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']).optional(),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>;
