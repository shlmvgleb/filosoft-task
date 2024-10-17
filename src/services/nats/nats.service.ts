import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { injectionTokens } from '../../utils/constants/tokens';
import { MessagePatternEnum } from '../../utils/enums/message.enum';
import { StudentByPersonalCodeNotFoundRpcException } from '../../utils/exceptions';
import { FindStudentPayload, StudentBusDto } from './types/student.type';

@Injectable()
export class NatsService implements OnModuleInit {
  constructor(
    @Inject(injectionTokens.studentService)
    private readonly natsClient: ClientProxy,
  ) {}

  private logger: Logger = new Logger(NatsService.name);

  async onModuleInit() {
    await this.natsClient.connect();
    this.logger.log('Successfully connected to NATS');
  }

  async findStudentByPersonalCode(
    personalCode: string,
  ): Promise<StudentBusDto> {
    const payload: FindStudentPayload = {
      personalCode,
    };

    const obs = this.natsClient.send(
      MessagePatternEnum.getStudent,
      JSON.stringify(payload),
    );
    const response = await firstValueFrom(obs);

    if (response?.error) {
      this.logger.error(
        'Error while fetching student by personal code',
        response.error,
      );

      throw new StudentByPersonalCodeNotFoundRpcException(personalCode);
    }

    return response.data;
  }
}
