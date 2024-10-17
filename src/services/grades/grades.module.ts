import { Module } from '@nestjs/common';
import { GradesRepository } from './repositories/grades.repo';
import { GradesService } from './grades.service';
import { PrismaModule } from '../../database/prisma.module';
import { GradesController } from './grades.controller';

@Module({
  controllers: [GradesController],
  providers: [GradesService, GradesRepository],
  exports: [GradesService],
  imports: [PrismaModule],
})
export class GradesModule {}
