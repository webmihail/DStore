import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';
import { TokenDTO } from './access.token.dto';

export class LoginResponseDTO {
  @ApiProperty({
    name: 'user',
    type: UserEntity,
  })
  user: UserEntity;

  @ApiProperty({
    name: 'accessToken',
    type: TokenDTO,
  })
  accessToken: TokenDTO;
}
