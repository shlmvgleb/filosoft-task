import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseQueryParams } from '../../utils/types/base-query-params';
import { SearchResultType } from '../../utils/types/search.result.type';
import { GradesRepository } from './repositories/grades.repo';
import { Statistic } from '../student/types/student-stats.types';

@Injectable()
export class GradesService {
  constructor(private readonly gradesRepository: GradesRepository) {}

  async create(params: Prisma.GradeCreateManyInput) {
    return this.gradesRepository.create(params);
  }

  async findAllPaginated(params: BaseQueryParams) {
    const { limit, page } = params;
    const grades = await this.gradesRepository.findAll({
      orderBy: { createdAt: 'asc' },
      include: { student: true },
      take: limit,
      skip: page * limit - limit,
    });

    const count = await this.gradesRepository.count();
    const pagesCount = Math.floor(count / limit);

    return {
      results: grades,
      pagesCount: count % limit === 0 ? pagesCount : pagesCount + 1,
      currentPage: page,
      rows: count,
    } satisfies SearchResultType<Prisma.GradeCreateInput>;
  }

  async findAll(params: Prisma.GradeFindManyArgs) {
    return this.gradesRepository.findAll(params);
  }

  async aggregateStudentStatistic(personalCode: string): Promise<Statistic[]> {
    return this.gradesRepository.aggregate(personalCode);
  }

  async count(params?: Prisma.GradeCountArgs) {
    return this.gradesRepository.count(params);
  }
}
