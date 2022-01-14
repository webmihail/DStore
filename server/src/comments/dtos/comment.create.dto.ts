import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { GenericEntity } from 'src/common/generic/generic.entity';

export class CommentCreateDTO extends GenericEntity {
  @ApiProperty({
    example: 'Mihail',
    description: 'Comment name',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Товар супер! ОБЯЗАТЕЛЬНО ЗАКАЖУ ЕЩЕ',
    description: 'Comment description',
  })
  @IsString()
  @MaxLength(255)
  description: string;
}
