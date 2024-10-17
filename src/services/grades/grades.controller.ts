import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { BaseQueryParams } from '../../utils/types/base-query-params';
import { Prisma } from '@prisma/client';
import { SearchResultType } from '../../utils/types/search.result.type';

@ApiTags()
@Controller()
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @ApiResponse({
    description: 'Лог оценок сортированный по дате',
    type: SearchResultType<Prisma.GradeCreateInput>,
  })
  @Get('log')
  async findAll(@Query() params: BaseQueryParams) {
    return this.gradesService.findAllPaginated(params);
  }
}
