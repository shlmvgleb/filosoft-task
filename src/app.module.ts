import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { PrismaModule } from './database/prisma.module';
import { NatsModule } from './services/nats/nats.module';
import { StudentModule } from './services/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule,
    StudentModule,
    NatsModule,
  ],
})
export class AppModule {}
