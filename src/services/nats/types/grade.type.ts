import { IsInt, IsString } from 'class-validator';

export class NewGradeEventDto {
  @IsString()
  personalCode: string;

  @IsString()
  subject: string;

  @IsInt()
  grade: number;
}
