import { RpcException } from '@nestjs/microservices';
import { ErrorMessagesEnum } from '../enums/error-messages.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { formatString } from '../common/helpers';

export class StudentByPersonalCodeNotFoundRpcException extends RpcException {
  constructor(code: string) {
    super(formatString(ErrorMessagesEnum.studentByPersonalCodeNotFound, code));
  }
}

export class StudentByPersonalCodeNotFoundException extends HttpException {
  constructor(code: string) {
    super(
      formatString(ErrorMessagesEnum.studentByPersonalCodeNotFound, code),
      HttpStatus.NOT_FOUND,
    );
  }
}
