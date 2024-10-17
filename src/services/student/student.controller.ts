import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { StudentStatistic } from './types/student-stats.types';

@ApiTags()
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('statistic/:personalCode')
  @ApiResponse({
    description: 'Статистика студента по всем предметам',
    status: HttpStatus.OK,
    type: StudentStatistic,
  })
  async findStudentStatisticById(@Param('personalCode') id: string) {
    return this.studentService.findStudentStatisticById(id);
  }
}
