import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/users/dtos/user.dto';
import { TokenDTO } from './access.token.dto';

export class LoginResponseDTO {
  @ApiProperty({
    name: 'user',
    type: UserDTO,
  })
  user: UserDTO;

  @ApiProperty({
    name: 'accessToken',
    type: TokenDTO,
  })
  accessToken: TokenDTO;
}
