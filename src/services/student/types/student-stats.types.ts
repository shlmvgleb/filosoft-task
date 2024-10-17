import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class StudentStatistic {
  @ApiProperty()
  student: Prisma.StudentCreateInput;

  @ApiProperty()
  statistic: Statistic[];
}

export class Statistic {
  @ApiProperty()
  subject: string; // код предмета

  @ApiProperty()
  maxGrade: number; // максимальная оценка

  @ApiProperty()
  minGrade: number; // минималььная оценка

  @ApiProperty()
  avgGrade: number; // средняя оценка (дробное число)

  @ApiProperty()
  totalGrades: number; // всего получено оценок
}
