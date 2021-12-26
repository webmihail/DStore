import { Request } from 'express';
import { UserDTO } from 'src/users/dtos/user.dto';

export interface RequestWithUserDTO extends Request {
  user: UserDTO;
}
