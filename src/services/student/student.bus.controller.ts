import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NewGradeEventDto } from '../nats/types/grade.type';
import { EventPatternEnum } from '../../utils/enums/event.enum';
import { StudentService } from './student.service';

@Controller()
export class StudentBusController {
  constructor(private readonly studentService: StudentService) {}

  @EventPattern(EventPatternEnum.newGrades)
  async handleStatusChange(dto: NewGradeEventDto) {
    await this.studentService.handleNewGradeEvent(dto);
  }
}
