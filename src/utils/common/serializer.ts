import { Serializer, OutgoingResponse } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export class OutboundResponseIdentitySerializer implements Serializer {
  private logger = new Logger(OutboundResponseIdentitySerializer.name);

  serialize(value: any): OutgoingResponse {
    this.logger.debug(
      `-->> Serializing outbound response: \n${JSON.stringify(value)}`,
    );
    return value;
  }
}
