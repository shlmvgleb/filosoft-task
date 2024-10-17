import { ApiProperty } from '@nestjs/swagger';

export class SearchResultType<T> {
  @ApiProperty()
  results: T[] | unknown[];

  @ApiProperty()
  pagesCount: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  rows: number;
}
