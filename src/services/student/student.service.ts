import { Injectable, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { GradesService } from '../grades/grades.service';
import { NatsService } from '../nats/nats.service';
import { NewGradeEventDto } from '../nats/types/grade.type';
import { findOrThrow } from '../../utils/common/helpers';
import { EventPatternEnum } from '../../utils/enums/event.enum';
import { StudentByPersonalCodeNotFoundException } from '../../utils/exceptions';
import { StudentRepository } from './repositories/student.repo';
import { StudentStatistic } from './types/student-stats.types';

@Injectable()
export class StudentService {
  constructor(
    private readonly natsService: NatsService,
    private readonly gradesService: GradesService,
    private readonly studentRepository: StudentRepository,
  ) {}

  private logger: Logger = new Logger(StudentService.name);

  async findByPersonalCode(personalCode: string) {
    return this.studentRepository.findById(personalCode);
  }

  async findByPersonalCodeOrThrow(personalCode: string) {
    return findOrThrow(
      async () => this.studentRepository.findById(personalCode),
      new StudentByPersonalCodeNotFoundException(personalCode),
    );
  }

  async findStudentStatisticById(id: string) {
    const student = await this.findByPersonalCodeOrThrow(id);
    const statistic = await this.gradesService.aggregateStudentStatistic(
      student.personalCode,
    );
    return {
      student,
      statistic,
    } satisfies StudentStatistic;
  }

  async createStudentByPersonalCode(personalCode: string) {
    const dto = await this.natsService.findStudentByPersonalCode(personalCode);
    return this.studentRepository.create(dto);
  }

  async handleNewGradeEvent(dto: NewGradeEventDto): Promise<void> {
    const errors = await validate(dto);
    if (errors.length !== 0) {
      return this.logger.error(
        `new event "${EventPatternEnum.newGrades}" had validation errors`,
        errors,
      );
    }

    const student = await this.findByPersonalCode(dto.personalCode);
    if (!student) {
      await this.createStudentByPersonalCode(dto.personalCode);
    }

    await this.gradesService.create({
      grade: dto.grade,
      subject: dto.subject,
      studentId: dto.personalCode,
    });
  }
}
