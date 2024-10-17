import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { Statistic } from '../../student/types/student-stats.types';

@Injectable()
export class GradesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: Prisma.GradeCreateManyInput) {
    return this.prismaService.grade.create({ data: params });
  }

  async findAll(params: Prisma.GradeFindManyArgs) {
    return this.prismaService.grade.findMany(params);
  }

  async count(params?: Prisma.GradeCountArgs) {
    return this.prismaService.grade.count(params);
  }

  async aggregate(studentId: string) {
    const rows = await this.prismaService.$queryRaw<any[]>`
      select count(id) as total, avg(grade)::FLOAT as avg, min(grade) as min, max(grade) as max, subject
      from grades
      where student_id=${studentId}
      group by subject
    `;

    return rows.map((row) => {
      return {
        avgGrade: row.avg,
        maxGrade: row.max,
        minGrade: row.min,
        totalGrades: row.total,
        subject: row.subject,
      } satisfies Statistic;
    });
  }

  async groupBy(params: Prisma.GradeGroupByArgs) {
    // eslint-disable-next-line
    // @ts-ignore 
    // Prisma ts types bug
    return this.prismaService.grade.groupBy(params);
  }
}
