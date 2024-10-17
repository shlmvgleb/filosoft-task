import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: Prisma.StudentCreateManyInput) {
    return this.prismaService.student.create({
      data: params,
    });
  }

  async count(params: Prisma.StudentCountArgs) {
    return this.prismaService.student.count(params);
  }

  async findAll(params: Prisma.StudentFindManyArgs) {
    return this.prismaService.student.findMany(params);
  }

  async findById(id: string) {
    return this.prismaService.student.findUnique({
      where: { personalCode: id },
    });
  }
}
