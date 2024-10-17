import { Module } from '@nestjs/common';
import { NatsService } from './nats.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsConfig } from '../../config/config.types';
import { injectionTokens } from '../../utils/constants/tokens';
import { OutboundResponseIdentitySerializer } from '../../utils/common/serializer';

@Module({
  providers: [NatsService],
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: injectionTokens.studentService,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const natsConfig = configService.get<NatsConfig>('nats');
            return {
              transport: Transport.NATS,
              options: {
                servers: natsConfig.url,
                serializer: new OutboundResponseIdentitySerializer(),
              },
            };
          },
        },
      ],
    }),
  ],
  exports: [NatsService],
})
export class NatsModule {}
