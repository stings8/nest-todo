import { z } from "zod";

export const updateTaskSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']).optional(),
});

export type UpdateTaskType = z.infer<typeof updateTaskSchema>;
