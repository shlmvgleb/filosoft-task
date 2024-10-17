import { IsString } from 'class-validator';

export interface FindStudentPayload {
  personalCode: string;
}

export class StudentBusDto {
  @IsString()
  personalCode: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
}
