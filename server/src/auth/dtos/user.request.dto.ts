import { Request } from 'express';
import { UserEntity } from 'src/users/entity/user.entity';

export interface RequestWithUserDTO extends Request {
  user: UserEntity;
}
