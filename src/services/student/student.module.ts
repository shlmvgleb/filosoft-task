import { Module } from '@nestjs/common';
import { NatsModule } from '../nats/nats.module';
import { StudentBusController } from './student.bus.controller';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { GradesModule } from '../grades/grades.module';
import { StudentRepository } from './repositories/student.repo';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  controllers: [StudentController, StudentBusController],
  providers: [StudentService, StudentRepository],
  imports: [NatsModule, GradesModule, PrismaModule],
})
export class StudentModule {}
