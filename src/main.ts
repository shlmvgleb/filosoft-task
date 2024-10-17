import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NatsOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { NatsConfig } from './config/config.types';
import { ValidationException } from './utils/exceptions';
import { errorFormatter } from './utils/validation/formatter';
import './utils/common/polyfills'; // big int issues from raw queries

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port', 3000);
  const natsConfig = configService.getOrThrow<NatsConfig>('nats');

  app.connectMicroservice<NatsOptions>({
    transport: Transport.NATS,
    options: {
      servers: natsConfig.url,
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Grades API')
    .setDescription('Student grades service documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errorFormatter(errors);
        return new ValidationException(messages);
      },
    }),
  );

  await app.listen(port, () => {
    logger.log(`Server started on port ${port}!`);
  });
}
bootstrap();
