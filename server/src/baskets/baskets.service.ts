import { Injectable } from '@nestjs/common';
import { PiecesService } from 'src/pieces/pieces.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BasketsService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly piecesService: PiecesService,
  ) {}
}
