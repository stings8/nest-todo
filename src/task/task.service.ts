import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Task } from '@prisma/client'
import { PrismaClientInitializationError, PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) { }



  async create(task: Task): Promise<Task | null> {
    return await this.prismaService.task.create({
      data: task
    })
  }

  async findAll() {
    return await this.prismaService.task.findMany();
  }

  async findOne(id: string) {

    try {
      return await this.prismaService.task.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        return {
          message: error.message
        }
      }
      if (error instanceof PrismaClientInitializationError) {
        return {
          code: error.errorCode,
          message: error.message
        }
      }
    }



  }

  async update(id: string, task: Partial<Task>) {
    await this.prismaService.task.update({
      where: { id },
      data: task,
    });

    return await this.findOne(id);
  }

  remove(id: string) {
    return this.prismaService.task.delete({
      where: { id },
    });
  }
}
