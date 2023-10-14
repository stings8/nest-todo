import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/zod-validation';
import { createTaskSchema } from './types/create-task';
import { updateTaskSchema } from './types/update-task';

const createValidationPipe = new ZodValidationPipe(createTaskSchema);

const updateValidationPipe = new ZodValidationPipe(updateTaskSchema)


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body(createValidationPipe) createTaskDto: Task) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(updateValidationPipe) task: Partial<Task>) {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
