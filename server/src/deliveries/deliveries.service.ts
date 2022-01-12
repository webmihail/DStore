import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DeliveriesService {
  constructor(private readonly usersServices: UsersService) {}
}
