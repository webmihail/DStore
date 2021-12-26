import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1paGFpbHdlYm1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NDA1MTE5MDAsImV4cCI6MTY0MDUzMzUwMH0.MhkiGCGT5XL4N-F6fs899TWvvexw3Jk_kCKa35byOmE',
    description: 'User email confirmation token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
